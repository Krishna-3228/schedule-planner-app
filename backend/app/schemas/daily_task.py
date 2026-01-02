# app/schemas/daily_task.py
from pydantic import BaseModel
from typing_extensions import Literal
from .task_base import TaskRead, TaskStatus, TaskUpdateBase


class DailyTaskCreate(BaseModel):
    title: str
    description: str | None = None
    status: TaskStatus = TaskStatus.TODO
    repeat_rule: str | None = None
    priority: int | None = None


class DailyTaskRead(TaskRead):
    repeat_rule: str | None = None
    priority: int | None = None

class DailyTaskUpdate(TaskUpdateBase):
    type: Literal["DAILY"]
    repeat_rule: str | None = None
    priority: int | None = None
