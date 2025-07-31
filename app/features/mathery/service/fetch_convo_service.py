# app/features/mathery/service/fetch_convo_service.py
import logging
from fastapi import HTTPException, status, Depends, Path
from sqlmodel import Session
from uuid import UUID
from typing import List

from app.core.database import get_session
from app.core.authorization import user_required
from app.utils.lookup_user_id import lookup_user_id
from app.features.mathery.crud.fetch_convo_crud import fetch_convo_crud
from app.features.mathery.schema.convo_schema import (
    ConvoHistoryParams,
    FetchConvoResponse,
    ConvoMessageResponse,
)

async def fetch_convo_service(
    mathery_uuid: UUID                   = Path(..., description="Mathery session UUID"),
    params: ConvoHistoryParams           = Depends(),
    db: Session                          = Depends(get_session),
    user: dict                           = user_required,
) -> FetchConvoResponse:
    try:
        user_id = lookup_user_id(user.get("sub"), db)

        summary, total, convos = fetch_convo_crud(
            db=db,
            user_id=user_id,
            mathery_uuid=mathery_uuid,
            search=params.search,
            page=params.page,
            count_per_page=params.count_per_page,
            char_limit=params.message_char_limit,
        )

        messages: List[ConvoMessageResponse] = [
            ConvoMessageResponse(
                mathery_convo_id = c.mathery_convo_id,
                message          = c.message,
                type             = c.type,
                role             = c.role,
                created_at       = c.created_at,
            )
            for c in convos
        ]

        return FetchConvoResponse(
            summary        = summary,
            page           = params.page,
            count_per_page = params.count_per_page,
            total_count    = total,
            messages       = messages,
        )

    except ValueError as ve:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=str(ve))
    except Exception:
        logging.exception("Failed to fetch conversation history")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Could not fetch conversation history"
        )
