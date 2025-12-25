# app/models/task.py
from sqlalchemy import Column, Integer, String, Text, Enum, DateTime
from sqlalchemy.sql import func
import enum

from ..db import Base

from sqlalchemy.orm import relationship


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

    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    daily_meta = relationship("DailyTaskMeta", uselist=False, back_populates="task")
    deadline_meta = relationship("DeadlineTaskMeta", uselist=False, back_populates="task")
    scheduled_meta = relationship("ScheduledTaskMeta", uselist=False, back_populates="task")
