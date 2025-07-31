# app/features/auth/crud/create_user_crud.py
from sqlmodel import Session, select
from app.models import User, UserRole, RoleEnum

def create_user_crud(
    db: Session,
    first_name: str,
    last_name: str,
    email: str,
    hashed_password: str,
    role: RoleEnum = RoleEnum.USER,
) -> User:
    # Check for existing email or username
    existing = db.exec(
        select(User).where(User.email == email)
    ).first()
    if existing:
        raise ValueError("Email already registered")

    # create the user
    user = User(
        first_name=first_name,
        last_name=last_name,
        email=email,
        password=hashed_password,
    )
    db.add(user)
    db.commit()
    db.refresh(user)

    user_role = UserRole(
        user_id=user.user_id,
        role=role
    )
    db.add(user_role)
    db.commit()
    # refresh so user.roles is populated
    db.refresh(user)

    return user
