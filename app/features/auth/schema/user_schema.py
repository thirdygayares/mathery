from typing import Literal

from pydantic import BaseModel, Field, EmailStr


class RegisterUserRequest(BaseModel):
    first_name: str = Field(..., max_length=50)
    last_name: str = Field(..., max_length=50)
    email: EmailStr = Field(..., description="User email address")
    password: str = Field(..., min_length=8, description="Plain-text password")

class TokenResponse(BaseModel):
    access_token: str
    token_type: Literal["bearer"] = "bearer"