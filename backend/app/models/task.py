# app/models/task.py
from sqlalchemy import Column, Integer, String, Text, Enum, DateTime
from sqlalchemy.sql import func
import enum

from ..db import Base


class TaskType(str, enum.Enum):
    DAILY = "DAILY"
    DEADLINE = "DEADLINE"
    SCHEDULED = "SCHEDULED"


class TaskStatus(str, enum.Enum):
    TODO = "TODO"
    IN_PROGRESS = "IN_PROGRESS"
    DONE = "DONE"
    CANCELLED = "CANCELLED"


class Task(Base):
    __tablename__ = "tasks"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    description = Column(Text, nullable=True)

    type = Column(Enum(TaskType), nullable=False, index=True)
    status = Column(Enum(TaskStatus), nullable=False, default=TaskStatus.TODO)

    deadline_at = Column(DateTime(timezone=True), nullable=True)
    scheduled_start = Column(DateTime(timezone=True), nullable=True)
    scheduled_end = Column(DateTime(timezone=True), nullable=True)

    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
