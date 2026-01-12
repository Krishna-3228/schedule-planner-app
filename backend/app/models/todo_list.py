# app/models/todo_list.py
from datetime import datetime
from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.orm import relationship
from ..db import Base

class TodoList(Base):
    __tablename__ = "todo_lists"

    id = Column(Integer, primary_key=True)
    title = Column(String(100), nullable=False)

    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    items = relationship("TodoItem", back_populates="list", cascade="all, delete-orphan")
