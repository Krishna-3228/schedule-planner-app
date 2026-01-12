# app/models/todo_item.py
from datetime import datetime
from sqlalchemy import Column, Integer, String, DateTime, Boolean, ForeignKey
from sqlalchemy.orm import relationship
from ..db import Base

class TodoItem(Base):
    __tablename__ = "todo_items"

    id = Column(Integer, primary_key=True)
    list_id = Column(Integer, ForeignKey("todo_lists.id"), nullable=False)

    title = Column(String(200), nullable=False)
    is_done = Column(Boolean, default=False)
    position = Column(Integer, default=0)

    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    list = relationship("TodoList", back_populates="items")
