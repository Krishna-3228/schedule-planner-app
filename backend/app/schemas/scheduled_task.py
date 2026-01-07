# app/schemas/scheduled_task.py
from pydantic import BaseModel, model_validator
from datetime import datetime, timezone
from typing_extensions import Literal
from .task_base import TaskRead, TaskStatus, TaskUpdateBase


class ScheduledTaskCreate(BaseModel):
    title: str
    description: str | None = None
    status: TaskStatus = TaskStatus.TODO
    scheduled_start: datetime | None = None
    scheduled_end: datetime | None = None
    location: str | None = None

    @model_validator(mode="after")
    def validate_schedule(self):
        def to_utc(dt: datetime) -> datetime:
            if dt.tzinfo is None:
                return dt.replace(tzinfo=timezone.utc)
            return dt.astimezone(timezone.utc)

        start = to_utc(self.scheduled_start)
        
        now = datetime.now(timezone.utc)

        if start < now:
            raise ValueError("scheduled_start cannot be in the past")
        
        end = None

        if self.scheduled_end is not None:
            end = to_utc(self.scheduled_end)
            if end < now:
                raise ValueError("scheduled_end cannot be in the past")

            if start >= end:
                raise ValueError("scheduled_start must be before scheduled_end")

        self.scheduled_start = start
        self.scheduled_end = end

        return self

class ScheduledTaskRead(TaskRead):
    scheduled_start: datetime | None = None
    scheduled_end: datetime | None = None
    location: str | None = None

class ScheduledTaskUpdate(TaskUpdateBase):
    type: Literal["SCHEDULED"]
    scheduled_start: datetime | None
    scheduled_end: datetime | None
    location: str | None

    @model_validator(mode="after")
    def validate_schedule(self):
        def to_utc(dt: datetime) -> datetime:
            if dt.tzinfo is None:
                return dt.replace(tzinfo=timezone.utc)
            return dt.astimezone(timezone.utc)

        start = to_utc(self.scheduled_start)
        end = to_utc(self.scheduled_end)
        now = datetime.now(timezone.utc)

        if start < now:
            raise ValueError("scheduled_start cannot be in the past")

        if end < now:
            raise ValueError("scheduled_end cannot be in the past")

        if start >= end:
            raise ValueError("scheduled_start must be before scheduled_end")

        self.scheduled_start = start
        self.scheduled_end = end

        return self
