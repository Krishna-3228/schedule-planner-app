# app/schemas/daily_task.py
from pydantic import BaseModel
from .task_base import TaskRead, TaskStatus


class DailyTaskCreate(BaseModel):
    title: str
    description: str | None = None
    status: TaskStatus = TaskStatus.TODO
    repeat_rule: str | None = None
    priority: int | None = None


class DailyTaskRead(TaskRead):
    repeat_rule: str | None = None
    priority: int | None = None
