from pydantic import BaseModel
from datetime import datetime
from .task_base import TaskRead


class DeadlineTaskCreate(BaseModel):
    title: str
    description: str | None = None
    deadline_at: datetime | None = None
    reminder_at: datetime | None = None


class DeadlineTaskRead(TaskRead):
    deadline_at: datetime | None
    reminder_at: datetime | None
