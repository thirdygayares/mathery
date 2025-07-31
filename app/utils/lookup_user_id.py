from uuid import UUID

from fastapi import HTTPException, status
from sqlmodel import Session, select

from app.models import User


def lookup_user_id(user_uuid: UUID, db: Session) -> int:
    user = db.exec(
        select(User).where(User.user_uuid == user_uuid)
    ).one_or_none()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"User {user_uuid} not found"
        )
    return user.user_id
