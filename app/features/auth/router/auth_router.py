from fastapi import APIRouter, Depends
from sqlmodel import Session
from starlette import status

from app.core.database import get_session
from app.features.auth.schema.auth_schema import TokenResponse, RegisterUserRequest, LoginRequest
from app.features.auth.service.create_user_service import create_user_service
from app.features.auth.service.user_admin_service import login_user_service

router = APIRouter(prefix="/api/auth", tags=["Mathery Authentication"])

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

@router.post("", response_model=TokenResponse, summary="Admin login")
async def login(
    form_data: LoginRequest,
    db: Session = Depends(get_session),
):
    """
    Authenticate an admin and return a JWT access token.
    """
    access_token = await login_user_service(db, form_data.email, form_data.password)
    return {"access_token": access_token}
