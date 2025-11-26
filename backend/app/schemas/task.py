# app/schemas/task.py
from datetime import datetime
from typing import Optional

from pydantic import BaseModel
from ..models.task import TaskType, TaskStatus


class TaskBase(BaseModel):
    title: str
    description: Optional[str] = None
    type: TaskType
    status: TaskStatus = TaskStatus.TODO
    deadline_at: Optional[datetime] = None
    scheduled_start: Optional[datetime] = None
    scheduled_end: Optional[datetime] = None


class TaskCreate(TaskBase):
    pass


class TaskUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    type: Optional[TaskType] = None
    status: Optional[TaskStatus] = None
    deadline_at: Optional[datetime] = None
    scheduled_start: Optional[datetime] = None
    scheduled_end: Optional[datetime] = None


class TaskRead(TaskBase):
    id: int

    class Config:
        from_attributes = True  # Pydantic v2; for v1 use orm_mode = True
