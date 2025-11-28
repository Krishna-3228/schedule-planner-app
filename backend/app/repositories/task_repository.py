# app/repositories/task_repository.py
from typing import List, Optional
from sqlalchemy.orm import Session

from ..models import Task, TaskType, TaskStatus


class TaskRepository:
    def __init__(self, db: Session):
        self.db = db

    def get_all(self) -> List[Task]:
        return self.db.query(Task).all()

    def get_by_id(self, task_id: int) -> Optional[Task]:
        return self.db.query(Task).filter(Task.id == task_id).first()

    def get_filtered(
        self,
        task_type: Optional[TaskType] = None,
        status: Optional[TaskStatus] = None,
    ) -> List[Task]:
        query = self.db.query(Task)
        if task_type is not None:
            query = query.filter(Task.type == task_type)
        if status is not None:
            query = query.filter(Task.status == status)
        return query.all()

    def create(self, task: Task) -> Task:
        self.db.add(task)
        self.db.commit()
        self.db.refresh(task)
        return task

    def update(self, task: Task) -> Task:
        # SQLAlchemy tracks changes automatically
        self.db.add(task)
        self.db.commit()
        self.db.refresh(task)
        return task

    def delete(self, task: Task) -> None:
        self.db.delete(task)
        self.db.commit()
