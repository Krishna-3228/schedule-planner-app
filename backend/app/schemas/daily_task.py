from pydantic import BaseModel
from .task_base import TaskRead


class DailyTaskCreate(BaseModel):
    title: str
    description: str | None = None
    repeat_rule: str | None = None
    priority: int | None = None


class DailyTaskRead(TaskRead):
    repeat_rule: str | None
    priority: int | None
