import json, logging
from uuid import UUID
from fastapi import APIRouter, WebSocket, WebSocketDisconnect, status
from sqlmodel import select

from app.core.openai_client import client
from app.core.authorization import get_current_user
from app.core.database import get_session
from app.core.settings import settings
from app.models import Mathery
from app.features.mathery.crud.create_convo_crud import create_convo_crud
from app.features.mathery.crud.convo_memory_crud import fetch_last_convos, update_summary
from app.features.mathery.schema.convo_schema import ConvoMessageRequest, ConvoMessageResponse, MessageType, RoleType
from app.utils.lookup_user_id import lookup_user_id
from app.utils.merge_summary import merge_summary

router = APIRouter(tags=["mathery ai tutoring"])

SYSTEM_INSTRUCTION = (
    "You are Mathery, an AI math tutor. "
    "Explain solutions step-by-step, ask probing questions, "
    "and always provide a direct answer (do not ask follow-up questions)."
)

@router.websocket("/ws/mathery/{mathery_uuid}/convo")
async def convo_ws(websocket: WebSocket, mathery_uuid: UUID):
    await websocket.accept()

    # — manual auth —
    auth = websocket.headers.get("authorization","")
    if not auth.lower().startswith("bearer "):
        await websocket.close(code=status.WS_1008_POLICY_VIOLATION)
        return
    token = auth.split(" ",1)[1]
    try:
        user_claims = get_current_user(token)
        user_uuid    = user_claims["sub"]
    except Exception:
        await websocket.close(code=status.WS_1008_POLICY_VIOLATION)
        return

    # single shared DB session
    db = next(get_session())
    user_id = lookup_user_id(user_uuid, db=db)

    while True:
        try:
            # 1) wait for the next user message
            raw = await websocket.receive_text()
            payload = ConvoMessageRequest(**json.loads(raw))

            # 2) typing indicator
            await websocket.send_json({"type":"typing"})

            # 3) persist USER message
            create_convo_crud(
                db=db,
                mathery_uuid=mathery_uuid,
                user_id=user_id,
                message=payload.message,
                msg_type=MessageType.TEXT,
                role=RoleType.USER,
            )

            # 4) fetch context
            recent = fetch_last_convos(db, mathery_uuid, user_id, limit=10)
            summary_text = (
                db.exec(
                    select(Mathery.summary)
                    .where(Mathery.mathery_uuid == mathery_uuid)
                ).one()[0] or ""
            )

            # 5) build chat history + system instructions
            msgs = [{"role":"system","content":SYSTEM_INSTRUCTION}]
            if summary_text:
                msgs.append({"role":"system","content":f"Summary: {summary_text}"})
            for c in reversed(recent):
                role_str = "assistant" if c.role == RoleType.AI else "user"
                msgs.append({"role":role_str, "content":c.message})
            msgs.append({"role":"user","content":payload.message})

            # 6) stream AI reply
            ai_content = ""
            stream = client.chat.completions.create(
                model=settings.OPENAI_MODEL,
                messages=msgs,
                stream=True,
            )
            ai_content = ""

            for chunk in stream:
                delta = chunk.choices[0].delta
                text = delta.content or ""
                ai_content += text
                await websocket.send_json({"type": "message_chunk", "data": text})

            # 7) persist AI message
            ai_convo = create_convo_crud(
                db=db,
                mathery_uuid=mathery_uuid,
                user_id=user_id,
                message=ai_content,
                msg_type=MessageType.TEXT,
                role=RoleType.AI,
            )

            # 8) update summary
            combined_msgs = [c.message for c in recent] + [payload.message, ai_content]
            new_summary = merge_summary(old=summary_text, messages=combined_msgs)
            update_summary(db, mathery_uuid, new_summary)

            # 9) send done marker with the AI convo ID
            await websocket.send_json({
                "type":"done",
                "data":{"mathery_convo_id": ai_convo.mathery_convo_id}
            })

            # loop back to await the next user message…

        except WebSocketDisconnect:
            logging.info("WebSocket disconnected by client")
            break
        except Exception:
            logging.exception("WebSocket error – closing")
            await websocket.close(code=status.WS_1011_INTERNAL_ERROR)
            break
