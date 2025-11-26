# app/config.py
from pydantic_settings import BaseSettings
from pydantic import Field


class Settings(BaseSettings):
    # For now, let's default to a simple SQLite DB for local dev.
    # We'll override this with Postgres when we run Docker later.
    DATABASE_URL: str = Field(
        default="sqlite:///./dev.db",
        description="Database URL (override via env, e.g. Postgres in Docker)",
    )

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"


settings = Settings()
