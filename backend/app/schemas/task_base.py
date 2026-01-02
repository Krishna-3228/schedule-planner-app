# app/schemas/task_base
from pydantic import BaseModel
from datetime import datetime
from app.models.task import TaskType, TaskStatus


class TaskBase(BaseModel):
    title: str
    description: str | None = None
    type: TaskType
    status: TaskStatus = TaskStatus.TODO


class TaskRead(TaskBase):
    id: int
    created_at: datetime | None
    updated_at: datetime | None

    class Config:
        from_attributes = True

class TaskUpdateBase(BaseModel):
    type: str
    title: str | None = None
    description: str | None = None
    status: str | None = None