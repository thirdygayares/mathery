# app/features/mathery/crud/fetch_mathery_crud.py
from typing import Tuple, List, Optional
from uuid import UUID
from sqlalchemy import func, desc, asc
from sqlmodel import Session, select

from app.models import Mathery, Topic

def fetch_mathery_crud(
    db: Session,
    user_id: int,
    topic_uuid: Optional[UUID],
    search: Optional[str],
    sort_by: str,
    sort_order: str,
    page: int,
    count_per_page: int,
) -> Tuple[int, List[Mathery]]:
    # base query
    stmt = select(Mathery).where(
        Mathery.user_id == user_id,
        Mathery.deleted_at.is_(None),
    )

    # optional topic filter
    if topic_uuid is not None:
        topic = db.exec(
            select(Topic).where(
                Topic.topic_uuid == topic_uuid,
                Topic.deleted_at.is_(None),
            )
        ).one_or_none()
        if not topic:
            raise ValueError("Topic not found")
        stmt = stmt.where(Mathery.topic_id == topic.topic_id)

    # optional text search
    if search:
        term = f"%{search}%"
        stmt = stmt.where(
            Mathery.name.ilike(term) |
            Mathery.summary.ilike(term)
        )

    # sorting
    sort_map = {
        "name": Mathery.name,
        "created_at": Mathery.created_at,
        "updated_at": Mathery.updated_at,
    }
    col = sort_map.get(sort_by, Mathery.created_at)
    order_fn = desc if sort_order.lower() == "desc" else asc
    stmt = stmt.order_by(order_fn(col))

    # pagination
    offset = (page - 1) * count_per_page
    rows: List[Mathery] = db.exec(
        stmt.limit(count_per_page).offset(offset)
    ).all()

    # total count (repeat the same filters)
    count_stmt = select(func.count()).select_from(Mathery).where(
        Mathery.user_id == user_id,
        Mathery.deleted_at.is_(None),
        *((Mathery.topic_id == topic.topic_id,) if topic_uuid is not None else ()),
        *((Mathery.name.ilike(term) | Mathery.summary.ilike(term),) if search else ())
    )
    total = db.exec(count_stmt).first() or 0

    return total, rows
