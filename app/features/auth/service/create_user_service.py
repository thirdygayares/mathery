import logging
from fastapi import HTTPException, status
from sqlmodel import Session
from app.core.jwt_token import create_jwt_token

from app.core.hashing import Hasher
from app.features.auth.crud.create_user_crud import create_user_crud
from app.features.auth.schema.user_schema import RegisterUserRequest, TokenResponse


async def create_user_service(
    db: Session,
    payload: RegisterUserRequest,
) -> TokenResponse:
    try:
        # Hash password
        hashed = Hasher.hash_password(payload.password)

        # Create DB user
        user = create_user_crud(
            db=db,
            first_name=payload.first_name,
            last_name=payload.last_name,
            email=payload.email,
            hashed_password=hashed,
        )

        # Build token payload (omit password)
        token_data = {
            "sub": str(user.user_uuid),
            "role": ["USER"],
        }
        token = create_jwt_token(token_data)

        return TokenResponse(access_token=token)

    except ValueError as ve:
        # Duplicate email/username → 409 Conflict
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail=str(ve),
        )
    except Exception:
        logging.exception("Error registering user")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Could not register user",
        )
