import secrets
from enum import Enum
from typing import List

from fastapi import Depends, HTTPException, Header
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer

from app.core.jwt_token import verify_jwt_token
from app.core.settings import settings


class SecurityScopes(str, Enum):
    SUPERADMIN = "SUPERADMIN"
    USER = "USER"



# Dependency to get the Authorization token from the header
def get_current_user_token(authorization: HTTPAuthorizationCredentials = Depends(HTTPBearer())):
    try:
        token = authorization.credentials
        return token
    except Exception:
        raise HTTPException(status_code=401, detail="Authorization header missing or invalid")


def get_current_user(token: str = Depends(get_current_user_token)):
    try:

        user_data = verify_jwt_token(token, settings.JWT_SECRET_KEY)

        return user_data
    except Exception as e:
        raise HTTPException(status_code=401, detail="Invalid credentials")


def check_authorization(required_roles: List[SecurityScopes]):
    async def _check_roles(current_user: dict = Depends(get_current_user)):
        user_roles = current_user.get("role", [])
        if not any(role in user_roles for role in required_roles):
            raise HTTPException(
                status_code=403,
                detail="Authorization failed. Required role(s): " + ", ".join(required_roles)
            )
        return current_user

    return Depends(_check_roles)

def role_required(allowed_roles: list[str]):
    async def _check(current_user: dict = Depends(get_current_user)):
        user_roles = current_user.get("role", [])
        if not any(role in user_roles for role in allowed_roles):
            raise HTTPException(
                status_code=403,
                detail="Authorization failed. Required role(s): " + ", ".join(allowed_roles)
            )
        return current_user
    return Depends(_check)


# Clean aliases — use these in routers
user_required = role_required([SecurityScopes.USER])
super_admin_required = role_required([SecurityScopes.SUPERADMIN])
