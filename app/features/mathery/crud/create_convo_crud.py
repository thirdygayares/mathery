from uuid import UUID
from sqlmodel import Session, select
from datetime import datetime, UTC

from app.models import Mathery, MatheryConvo, MessageType, RoleType

def create_convo_crud(
    db: Session,
    mathery_uuid: UUID,
    user_id: int,
    message: str,
    msg_type: MessageType = MessageType.TEXT,
    role: RoleType       = RoleType.USER,
) -> MatheryConvo:
    # 1) Find the session, ensure it belongs to this user
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

    # 2) Persist the message
    convo = MatheryConvo(
        mathery_id = mathery.mathery_id,
        message    = message,
        type       = msg_type,
        role       = role,
        created_at = datetime.now(UTC),
    )
    db.add(convo)
    db.commit()
    db.refresh(convo)
    return convo
