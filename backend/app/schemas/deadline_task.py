# app/schemas/deadline_task.py
from pydantic import BaseModel
from datetime import datetime
from typing_extensions import Literal
from .task_base import TaskRead, TaskStatus, TaskUpdateBase


class DeadlineTaskCreate(BaseModel):
    title: str
    description: str | None = None
    status: TaskStatus = TaskStatus.TODO
    deadline_at: datetime | None = None
    reminder_at: datetime | None = None


class DeadlineTaskRead(TaskRead):
    deadline_at: datetime | None = None
    reminder_at: datetime | None = None

class DeadlineTaskUpdate(TaskUpdateBase):
    type: Literal["DEADLINE"]
    deadline_at: datetime | None
    reminder_at: datetime | None
