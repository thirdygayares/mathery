import logging
from fastapi import HTTPException, status, Depends
from sqlmodel import Session

from app.core.authorization import user_required
from app.core.database import get_session
from app.features.mathery.crud.create_mathery_crud import create_mathery_crud
from app.features.mathery.schema.mathery_schema import MatheryResponse, CreateMatheryRequest
from app.utils.lookup_user_id import lookup_user_id


async def create_mathery_service(
    payload: CreateMatheryRequest,
    db: Session = Depends(get_session),
    user=user_required,
) -> MatheryResponse:
    user_id = lookup_user_id(user.get("sub"), db)
    try:
        m = create_mathery_crud(
            db=db,
            user_id=user_id,
            topic_uuid=payload.topic_uuid,
            name=payload.name,
            summary=payload.summary,
        )

        return MatheryResponse(
            mathery_uuid=m.mathery_uuid,
            topic_uuid=m.topic_id and m.topic_uuid,
            name=m.name,
            summary=m.summary,
            created_at=m.created_at,
            updated_at=m.updated_at,
        )

    except ValueError as ve:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=str(ve))
    except Exception:
        logging.exception("Failed to create Mathery")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Could not create session"
        )
