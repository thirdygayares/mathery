from typing import List
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    ENV: str
    JWT_SECRET_KEY: str
    JWT_ACCESS_TOKEN_EXPIRES: int
    DATABASE_URL: str
    CORS_ALLOWED_ORIGINS: List[str] = []
    FRONTEND_URL: str
    JWT_SECRET_KEY_RESET_PASSWORD: str = "default_reset_key"

    class Config:
        env_file = ".env"
        extra = "allow"

settings = Settings()
