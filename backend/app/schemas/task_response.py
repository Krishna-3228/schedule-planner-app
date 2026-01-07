# app/schemas/task_response.py
from pydantic import BaseModel
from datetime import datetime
from app.models.daily_task import Weekday

from ..models.task import TaskType, TaskStatus

class DailyOut(BaseModel):
    repeat_days: list[Weekday] = []
    priority: int | None

class DeadlineOut(BaseModel):
    deadline_at: datetime | None
    reminder_at: datetime | None

class ScheduledOut(BaseModel):
    scheduled_start: datetime | None
    scheduled_end: datetime | None
    location: str | None

class TaskOut(BaseModel):
    id: int
    title: str
    description: str | None
    type: TaskType
    status: TaskStatus
    created_at: datetime
    updated_at: datetime | None

    daily: DailyOut | None = None
    deadline: DeadlineOut | None = None
    scheduled: ScheduledOut | None = None
