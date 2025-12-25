from pydantic import BaseModel
from datetime import datetime
from .task_base import TaskRead


class ScheduledTaskCreate(BaseModel):
    title: str
    description: str | None = None
    scheduled_start: datetime | None = None
    scheduled_end: datetime | None = None
    location: str | None = None


class ScheduledTaskRead(TaskRead):
    scheduled_start: datetime | None
    scheduled_end: datetime | None
    location: str | None
