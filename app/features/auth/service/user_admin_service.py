from sqlmodel import Session
from fastapi import HTTPException, status
from app.core.hashing import Hasher
from app.core.jwt_token import create_jwt_token
from app.features.auth.crud.fetch_user_by_email_crud import fetch_user_by_email_crud

async def login_user_service(db: Session, email: str, password: str) -> str:
    # 1) fetch the user record
    try:
        user = fetch_user_by_email_crud(db, email)
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail=str(e))

    # 2) verify password
    if not user.password or not Hasher.verify_password(password, user.password):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid email or password")

    # 3) assemble JWT payload
    payload: dict = {
        "sub": str(user.user_uuid),
        "role": [ar.role.value for ar in user.roles],
    }

    # 4) issue token
    token = create_jwt_token(payload)
    return token
