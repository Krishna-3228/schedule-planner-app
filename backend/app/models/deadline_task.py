# app/models/deadline_task.py

from sqlalchemy import Column, Integer, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from ..db import Base

class DeadlineTaskMeta(Base):
    __tablename__ = "deadline_task_meta"

    task_id = Column(Integer, ForeignKey("tasks.id"), primary_key=True)
    deadline_at = Column(DateTime(timezone=True))
    reminder_at = Column(DateTime(timezone=True))

    task = relationship("Task", back_populates="deadline_meta")
