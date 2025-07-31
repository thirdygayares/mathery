import jwt
from datetime import datetime, timedelta, UTC

from fastapi import HTTPException

from app.core.settings import settings

def create_jwt_token(user_data: dict, secret: int = settings.JWT_SECRET_KEY, expires_in: int = settings.JWT_ACCESS_TOKEN_EXPIRES):
    payload = user_data.copy()
    payload["exp"] = datetime.now(UTC) + timedelta(seconds=expires_in)
    token = jwt.encode(payload, secret, algorithm="HS256")
    return token

def verify_jwt_token(token: str, secret: int = settings.JWT_SECRET_KEY):
    try:
        payload = jwt.decode(token, secret, algorithms=["HS256"])
        return payload
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")