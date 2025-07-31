import logging
from fastapi import HTTPException, status, Depends
from sqlmodel import Session

from app.core.database import get_session
from app.core.authorization import user_required
from app.utils.lookup_user_id import lookup_user_id
from app.features.mathery.crud.fetch_mathery_crud import fetch_mathery_crud
from app.features.mathery.schema.mathery_schema import (
    MatheryFilterParams,
    FetchMatheryResponse,
    MatheryResponse,
)

async def fetch_mathery_service(
    filters: MatheryFilterParams = Depends(),
    db: Session               = Depends(get_session),
    user: dict                = user_required,
) -> FetchMatheryResponse:
    try:
        user_id = lookup_user_id(user.get("sub"), db)
        total, sessions = fetch_mathery_crud(
            db=db,
            user_id=user_id,
            topic_uuid=filters.topic_uuid,
            search=filters.search,
            sort_by=filters.sort_by,
            sort_order=filters.sort_order,
            page=filters.page,
            count_per_page=filters.count_per_page,
        )

        data = [
            MatheryResponse(
                mathery_uuid=m.mathery_uuid,
                name=m.name,
                summary=m.summary,
                created_at=m.created_at,
                updated_at=m.updated_at,
            )
            for m in sessions
        ]

        return FetchMatheryResponse(
            page=filters.page,
            count_per_page=filters.count_per_page,
            total_count=total,
            data=data,
        )

    except Exception:
        logging.exception("Failed to fetch Mathery sessions")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Could not fetch sessions"
        )
