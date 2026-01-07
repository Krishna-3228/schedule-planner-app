# app/schemas/deadline_task.py
from pydantic import BaseModel, model_validator
from datetime import datetime, timezone
from typing_extensions import Literal
from .task_base import TaskRead, TaskStatus, TaskUpdateBase


class DeadlineTaskCreate(BaseModel):
    title: str
    description: str | None = None
    status: TaskStatus = TaskStatus.TODO
    deadline_at: datetime | None = None
    reminder_at: datetime | None = None

    @model_validator(mode="after")
    def validate_deadline(self):
        def to_utc(dt: datetime) -> datetime:
            if dt.tzinfo is None:
                return dt.replace(tzinfo=timezone.utc)
            return dt.astimezone(timezone.utc)

        deadline = to_utc(self.deadline_at)
            
        now = datetime.now(timezone.utc)

        if deadline < now:
            raise ValueError("deadline_at cannot be in the past")
        
        reminder = None

        if self.reminder_at is not None:
            reminder = to_utc(self.reminder_at)
            if reminder < now:
                raise ValueError("reminder_at cannot be in the past")

            if reminder >= deadline:
                raise ValueError("reminder_at must be before deadline_at")

        # normalize stored values
        self.deadline_at = deadline
        self.reminder_at = reminder

        return self

class DeadlineTaskRead(TaskRead):
    deadline_at: datetime | None = None
    reminder_at: datetime | None = None

class DeadlineTaskUpdate(TaskUpdateBase):
    type: Literal["DEADLINE"]
    deadline_at: datetime | None
    reminder_at: datetime | None

    @model_validator(mode="after")
    def validate_deadline(self):
        def to_utc(dt: datetime) -> datetime:
            if dt.tzinfo is None:
                return dt.replace(tzinfo=timezone.utc)
            return dt.astimezone(timezone.utc)

        deadline = to_utc(self.deadline_at)
            
        now = datetime.now(timezone.utc)

        if deadline < now:
            raise ValueError("deadline_at cannot be in the past")
        
        reminder = None

        if self.reminder_at is not None:
            reminder = to_utc(self.reminder_at)
            if reminder < now:
                raise ValueError("reminder_at cannot be in the past")

            if reminder >= deadline:
                raise ValueError("reminder_at must be before deadline_at")

        # normalize stored values
        self.deadline_at = deadline
        self.reminder_at = reminder

        return self