from sqlmodel import create_engine, Session
from app.core.settings import Settings

# Create the database engine
engine = create_engine(
    Settings().DATABASE_URL,
    future=True,
    echo=True
)

# Dependency to get the database session
def get_session():
    with Session(engine) as session:
        yield session