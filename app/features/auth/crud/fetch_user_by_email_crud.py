from sqlmodel import Session, select
from sqlalchemy.orm import selectinload
from app.models import User

def fetch_user_by_email_crud(db: Session, email: str) -> User:
    """
    Load an user by email, including merchant, branch, and roles.
    Raises ValueError if not found.
    """
    statement = (
        select(User)
        .where(User.email == email, User.deleted_at.is_(None))
        .options(
            selectinload(User.roles),
        )
    )
    user = db.exec(statement).one_or_none()
    if not user:
        raise ValueError("Invalid email or password")
    return user
