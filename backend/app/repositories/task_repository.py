# app/repositories/task_repository.py
from typing import List, Optional
from sqlalchemy.orm import Session

from ..models import Task, TaskType


class TaskRepository:
    def __init__(self, db: Session):
        self.db = db

    def get_all(self) -> List[Task]:
        return self.db.query(Task).all()

    def get_by_id(self, task_id: int) -> Optional[Task]:
        return self.db.query(Task).filter(Task.id == task_id).first()

    def get_by_type(self, task_type: TaskType) -> List[Task]:
        return self.db.query(Task).filter(Task.type == task_type).all()

    def create(self, task: Task) -> Task:
        self.db.add(task)
        self.db.commit()
        self.db.refresh(task)
        return task
