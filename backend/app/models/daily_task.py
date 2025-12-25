# app/models/daily_task.py

from sqlalchemy import Column, Integer, ForeignKey, String
from sqlalchemy.orm import relationship
from ..db import Base

class DailyTaskMeta(Base):
    __tablename__ = "daily_task_meta"

    task_id = Column(Integer, ForeignKey("tasks.id"), primary_key=True)
    repeat_rule = Column(String(50))
    priority = Column(Integer)

    task = relationship("Task", back_populates="daily_meta")
