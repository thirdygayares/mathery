from pydantic import BaseModel, Field
from datetime import datetime
from enum import Enum
from typing import Literal

class MessageType(str, Enum):
    TEXT = "TEXT"
    IMAGE = "IMAGE"
    MD = "MD"

class RoleType(str, Enum):
    USER = "USER"
    AI = "AI"

class ConvoMessageRequest(BaseModel):
    message: str = Field(..., max_length=2000, description="Your chat message")

class ConvoMessageResponse(BaseModel):
    mathery_convo_id: int
    message: str
    type: MessageType
    role: RoleType
    created_at: datetime
