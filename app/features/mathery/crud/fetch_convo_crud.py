from typing import Tuple, List, Optional
from uuid import UUID
from sqlalchemy import func
from sqlmodel import Session, select, desc

from app.models import Mathery, MatheryConvo

def fetch_convo_crud(
    db: Session,
    user_id: int,
    mathery_uuid: UUID,
    search: Optional[str],
    page: int,
    count_per_page: int,
    char_limit: int,
) -> Tuple[str, int, List[MatheryConvo]]:
    # Verify ownership
    mathery = db.exec(
        select(Mathery)
        .where(
            Mathery.mathery_uuid == mathery_uuid,
            Mathery.user_id      == user_id,
            Mathery.deleted_at.is_(None),
        )
    ).one_or_none()
    if not mathery:
        raise ValueError("Mathery session not found or unauthorized")

    # Build base query
    stmt = select(MatheryConvo).where(
        MatheryConvo.mathery_id == mathery.mathery_id
    ).order_by(desc(MatheryConvo.created_at))

    if search:
        term = f"%{search}%"
        stmt = stmt.where(MatheryConvo.message.ilike(term))

    # 3) total count
    total = db.exec(
        select(func.count()).select_from(MatheryConvo)
        .where(
            MatheryConvo.mathery_id == mathery.mathery_id,
            *((MatheryConvo.message.ilike(term),) if search else ())
        )
    ).one() or 0

    # apply pagination
    offset = (page - 1) * count_per_page
    convos: List[MatheryConvo] = db.exec(
        stmt.limit(count_per_page).offset(offset)
    ).all()

    #  truncate messages
    for c in convos:
        if len(c.message) > char_limit:
            c.message = c.message[:char_limit]

    return mathery.summary, total, convos
