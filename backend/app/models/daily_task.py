# app/models/daily_task.py

from sqlalchemy.dialects.postgresql import ARRAY
from enum import Enum
from sqlalchemy import Column, Integer, ForeignKey, String
from sqlalchemy.orm import relationship
from ..db import Base

class Weekday(str, Enum):
    MON = "MON"
    TUE = "TUE"
    WED = "WED"
    THU = "THU"
    FRI = "FRI"
    SAT = "SAT"
    SUN = "SUN"

class DailyTaskMeta(Base):
    __tablename__ = "daily_task_meta"

    task_id = Column(Integer, ForeignKey("tasks.id"), primary_key=True)
    repeat_days = Column(ARRAY(String(3)), nullable=False, server_default="{}")
    priority = Column(Integer)

    task = relationship("Task", back_populates="daily_meta")
