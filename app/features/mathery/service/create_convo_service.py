# app/features/mathery/service/create_convo_service.py
import logging
from fastapi import HTTPException, status, Depends
from sqlmodel import Session
from uuid import UUID

from app.core.database import get_session
from app.core.authorization import user_required
from app.features.mathery.crud.create_convo_crud import create_convo_crud
from app.features.mathery.schema.convo_schema import (
    ConvoMessageRequest,
    ConvoMessageResponse,
    MessageType,
    RoleType,
)
from app.utils.lookup_user_id import lookup_user_id


async def create_convo_service(
    mathery_uuid: UUID,
    payload: ConvoMessageRequest,
    db: Session  = Depends(get_session),
    user: dict             = user_required,
) -> ConvoMessageResponse:
    user_id = lookup_user_id(user.get("sub"), db)
    try:
        convo = create_convo_crud(
            db         = db,
            mathery_uuid = mathery_uuid,
            user_id    = user_id,
            message    = payload.message,
            msg_type   = MessageType.TEXT,
            role       = RoleType.USER,
        )
        return ConvoMessageResponse(
            mathery_convo_id = convo.mathery_convo_id,
            message          = convo.message,
            type             = convo.type,
            role             = convo.role,
            created_at       = convo.created_at,
        )
    except ValueError as ve:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=str(ve))
    except Exception:
        logging.exception("Failed to persist convo message")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Could not send message"
        )
