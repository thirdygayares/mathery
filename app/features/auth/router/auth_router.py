from fastapi import APIRouter, Depends
from sqlmodel import Session
from starlette import status

from app.core.database import get_session
from app.features.auth.schema.user_schema import TokenResponse, RegisterUserRequest
from app.features.auth.service.create_user_service import create_user_service

router = APIRouter(prefix="/api/auth", tags=["Authentication"])


@router.post(
    "/user/register",
    response_model=TokenResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Register a new user and receive an access token",
)
async def register_user(
    payload: RegisterUserRequest,
    db: Session = Depends(get_session),
):
    """
    Create a new user account and immediately issue a JWT access token.
    """
    return await create_user_service(db=db, payload=payload)