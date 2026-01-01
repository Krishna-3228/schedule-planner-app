# app/schemas/deadline_task.py
from pydantic import BaseModel
from datetime import datetime
from .task_base import TaskRead, TaskStatus


class DeadlineTaskCreate(BaseModel):
    title: str
    description: str | None = None
    status: TaskStatus = TaskStatus.TODO
    deadline_at: datetime | None = None
    reminder_at: datetime | None = None


class DeadlineTaskRead(TaskRead):
    deadline_at: datetime | None = None
    reminder_at: datetime | None = None
