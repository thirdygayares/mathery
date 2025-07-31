# app/features/mathery/service/mathery_tutor_service.py
import logging
from typing import AsyncGenerator
from uuid import UUID
from fastapi import Depends, HTTPException, status, Path
from sqlmodel import Session, select
import openai

from app.core.database import get_session
from app.core.authorization import user_required
from app.models import Mathery
from app.utils.lookup_user_id import lookup_user_id
from app.features.mathery.crud.create_convo_crud import create_convo_crud
from app.features.mathery.crud.convo_memory_crud import fetch_last_convos, update_summary
from app.features.mathery.schema.convo_schema import ConvoMessageRequest, ConvoMessageResponse
from app.features.mathery.schema.convo_schema import MessageType, RoleType
from app.utils.merge_summary import merge_summary

SYSTEM_INSTRUCTION = (
    "You are Mathery, an AI math tutor. "
    "Explain solutions step-by-step, ask probing questions, "
    "and check the user’s understanding."
)

async def mathery_tutor_service(
    mathery_uuid: UUID = Path(..., description="Mathery session UUID"),
    payload: ConvoMessageRequest = Depends(),
    db: Session = Depends(get_session),
    user: dict = user_required,
) -> AsyncGenerator[ConvoMessageResponse, None]:
    """
    Streams back chunks of AI response as they arrive.
    """
    user_id = lookup_user_id(user.get("sub"), db)

    try:
        # 1) Persist the user’s message immediately
        user_convo = create_convo_crud(
            db=db,
            mathery_uuid=mathery_uuid,
            user_id=user_id,
            message=payload.message,
            msg_type=MessageType.TEXT,
            role=RoleType.USER,
        )

        # 2) Fetch context: last 10 convos + existing summary
        recent = fetch_last_convos(db, mathery_uuid, user_id, limit=10)
        parent = db.exec(
            select(Mathery.summary)
            .where(Mathery.mathery_uuid == mathery_uuid)
        ).one()
        summary_text = parent[0] or ""

        # 3) Build OpenAI messages
        msgs = [{"role": "system", "content": SYSTEM_INSTRUCTION}]
        if summary_text:
            msgs.append({"role": "system", "content": f"Context summary: {summary_text}"})
        # oldest → newest
        for c in reversed(recent):
            role = c.role.value.lower()
            msgs.append({"role": role, "content": c.message})
        msgs.append({"role": "user", "content": payload.message})

        # 4) Call OpenAI ChatCompletion with streaming
        stream = openai.ChatCompletion.create(
            model="gpt-4o-mini",
            messages=msgs,
            stream=True,
        )

        # accumulate full AI reply
        ai_content = ""

        # 5) Yield each chunk as ConvoMessageResponse
        for chunk in stream:
            delta = chunk.choices[0].delta.get("content", "")
            ai_content += delta
            yield ConvoMessageResponse(
                mathery_convo_id=None,  # fill in after persistence
                message=delta,
                type=MessageType.TEXT,
                role=RoleType.AI,
                created_at=chunk.choices[0].delta.get("timestamp")  # or datetime.now()
            )

        # 6) Persist the full AI reply
        ai_convo = create_convo_crud(
            db=db,
            mathery_uuid=mathery_uuid,
            user_id=user_id,
            message=ai_content,
            msg_type=MessageType.TEXT,
            role=RoleType.AI,
        )

        # 7) Update summary by merging old + new reply
        new_summary = merge_summary(old=summary_text, messages=[c.message for c in recent] + [payload.message, ai_content])
        update_summary(db, mathery_uuid, new_summary)

        # 8) Finally, send a “done” marker with the persisted convo ID
        yield ConvoMessageResponse(
            mathery_convo_id=ai_convo.mathery_convo_id,
            message="",
            type=MessageType.TEXT,
            role=RoleType.AI,
            created_at=ai_convo.created_at,
        )

    except ValueError as ve:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=str(ve))
    except Exception:
        logging.exception("Error in Mathery tutor flow")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Could not process tutor request"
        )
