# app/schemas/scheduled_task.py
from pydantic import BaseModel
from datetime import datetime
from typing_extensions import Literal
from .task_base import TaskRead, TaskStatus, TaskUpdateBase


class ScheduledTaskCreate(BaseModel):
    title: str
    description: str | None = None
    status: TaskStatus = TaskStatus.TODO
    scheduled_start: datetime | None = None
    scheduled_end: datetime | None = None
    location: str | None = None


class ScheduledTaskRead(TaskRead):
    scheduled_start: datetime | None = None
    scheduled_end: datetime | None = None
    location: str | None = None

class ScheduledTaskUpdate(TaskUpdateBase):
    type: Literal["SCHEDULED"]
    scheduled_start: datetime | None
    scheduled_end: datetime | None
    location: str | None

