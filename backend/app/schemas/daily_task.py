# app/schemas/daily_task.py
from pydantic import BaseModel, field_validator
from typing_extensions import Literal
from .task_base import TaskRead, TaskStatus, TaskUpdateBase
from app.models.daily_task import Weekday


class DailyTaskCreate(BaseModel):
    title: str
    description: str | None = None
    status: TaskStatus = TaskStatus.TODO
    repeat_days: list[Weekday] = []
    priority: int | None = None

    @field_validator("repeat_days")
    @classmethod
    def validate_repeat_days(cls, days):
        if not days:
            raise ValueError("repeat_days must contain at least one or at most seven days")

        if len(days) > 7:
            raise ValueError("repeat_days must contain at most seven days")

        if len(set(days)) != len(days):
            raise ValueError("repeat_days must not contain duplicates")

        return days


class DailyTaskRead(TaskRead):
    repeat_days: list[Weekday] = []
    priority: int | None = None

class DailyTaskUpdate(TaskUpdateBase):
    type: Literal["DAILY"]
    repeat_days: list[Weekday] = []
    priority: int | None = None

    @field_validator("repeat_days")
    @classmethod
    def validate_repeat_days(cls, days):
        if not days:
            raise ValueError("repeat_days must contain at least one or at most seven days")

        if len(days) > 7:
            raise ValueError("repeat_days must contain at most seven days")

        if len(set(days)) != len(days):
            raise ValueError("repeat_days must not contain duplicates")

        return days
