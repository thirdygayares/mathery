from pydantic import BaseModel, Field
from uuid import UUID
from typing import Optional, List
from datetime import datetime

class CreateMatheryRequest(BaseModel):
    topic_uuid: Optional[UUID] = Field(
        None,
        description="(Optional) Which topic this session is about"
    )
    name: str = Field(..., max_length=100)
    summary: str = Field(..., max_length=500)

class MatheryResponse(BaseModel):
    mathery_uuid: UUID
    topic_uuid: Optional[UUID] = None
    name: str
    summary: str
    created_at: datetime
    updated_at: datetime

class MatheryFilterParams(BaseModel):
    """
    All GET /api/mathery query parameters.
    """
    topic_uuid: Optional[UUID] = None           # restrict to a specific topic
    search: Optional[str]      = None           # substring match on name or summary
    sort_by: str               = "created_at"   # one of: name, created_at, updated_at
    sort_order: str            = "desc"         # asc or desc
    page: int                  = 1              # 1-based page number
    count_per_page: int        = 20             # items per page (5–50)

class FetchMatheryResponse(BaseModel):
    page: int
    count_per_page: int
    total_count: int
    data: List[MatheryResponse]