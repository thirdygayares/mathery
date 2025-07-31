from typing import List
from uuid import UUID
from sqlmodel import Session, select
from sqlalchemy import func, desc
from app.models import Mathery, MatheryConvo

def fetch_last_convos(
    db: Session,
    mathery_uuid: UUID,
    user_id: int,
    limit: int = 10,
) -> List[MatheryConvo]:
    m = db.exec(
        select(Mathery)
        .where(
            Mathery.mathery_uuid == mathery_uuid,
            Mathery.user_id == user_id,
            Mathery.deleted_at.is_(None),
        )
    ).one_or_none()
    if not m:
        raise ValueError("Mathery session not found or unauthorized")

    return db.exec(
        select(MatheryConvo)
        .where(MatheryConvo.mathery_id == m.mathery_id)
        .order_by(desc(MatheryConvo.created_at))
        .limit(limit)
    ).all()


def update_summary(
    db: Session,
    mathery_uuid: UUID,
    new_summary: str
) -> None:
    # 1) Load the Mathery row
    mathery = db.exec(
        select(Mathery).where(Mathery.mathery_uuid == mathery_uuid)
    ).one_or_none()
    if not mathery:
        raise ValueError("Mathery session not found")

    # 2) Assign & commit
    mathery.summary = new_summary
    db.add(mathery)
    db.commit()