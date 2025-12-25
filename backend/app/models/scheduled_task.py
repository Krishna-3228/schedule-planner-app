# app/models/scheduled_task.py

from sqlalchemy import Column, Integer, ForeignKey, DateTime, String
from sqlalchemy.orm import relationship
from ..db import Base

class ScheduledTaskMeta(Base):
    __tablename__ = "scheduled_task_meta"

    task_id = Column(Integer, ForeignKey("tasks.id"), primary_key=True)
    scheduled_start = Column(DateTime(timezone=True))
    scheduled_end = Column(DateTime(timezone=True))
    location = Column(String(100))

    task = relationship("Task", back_populates="scheduled_meta")
