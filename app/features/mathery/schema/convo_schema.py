from pydantic import BaseModel, Field
from datetime import datetime
from enum import Enum
from typing import Optional, List
from uuid import UUID

class MessageType(str, Enum):
    TEXT = "TEXT"
    IMAGE = "IMAGE"
    MD    = "MD"

class RoleType(str, Enum):
    USER = "USER"
    AI   = "AI"

class ConvoMessageRequest(BaseModel):
    message: str = Field(..., max_length=2000, description="Your chat message")

class ConvoHistoryParams(BaseModel):
    search: Optional[str]        = Field(None, description="Substring filter on message text")
    page: int                    = Field(1, ge=1, description="1-based page number")
    count_per_page: int          = Field(10, ge=1, le=50, description="Items per page (max 50)")
    message_char_limit: int      = Field(250, ge=1, le=250, description="Truncate each message to this many chars")

class ConvoMessageResponse(BaseModel):
    mathery_convo_id: int
    message: str
    type: MessageType
    role: RoleType
    created_at: datetime

class FetchConvoResponse(BaseModel):
    summary: str
    page: int
    count_per_page: int
    total_count: int
    messages: List[ConvoMessageResponse]
