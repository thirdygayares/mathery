from sqlalchemy import event
from datetime import datetime, UTC
from app.models import User


@event.listens_for(User, "before_update")
def auto_update_timestamp(mapper, connection, target):
    target.updated_at = datetime.now(UTC)
