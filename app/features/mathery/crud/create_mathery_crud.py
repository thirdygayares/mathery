from typing import Optional

from sqlmodel import Session, select
from uuid import UUID
from datetime import datetime, UTC

from app.models import Mathery, Topic

def create_mathery_crud(
    db: Session,
    user_id: int,
    topic_uuid: Optional[UUID],
    name: str,
    summary: str,
) -> Mathery:
    # Only validate/look up a topic if one was provided
    topic_id = None
    if topic_uuid is not None:
        topic = db.exec(
            select(Topic).where(
                Topic.topic_uuid == topic_uuid,
                Topic.deleted_at.is_(None)
            )
        ).one_or_none()
        if not topic:
            raise ValueError("Topic not found")
        topic_id = topic.topic_id

    mathery = Mathery(
        user_id=user_id,
        topic_id=topic_id,
        name=name,
        summary=summary,
        created_at=datetime.now(UTC),
        updated_at=datetime.now(UTC),
    )
    db.add(mathery)
    db.commit()
    db.refresh(mathery)
    return mathery