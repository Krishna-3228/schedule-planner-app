# app/services/task_service.py
from typing import List, Optional
from sqlalchemy.orm import Session

from ..models import Task, TaskType
from ..schemas.task import TaskCreate
from ..repositories.task_repository import TaskRepository


class TaskService:
    def __init__(self, db: Session):
        self.repo = TaskRepository(db)

    def list_tasks(self) -> List[Task]:
        return self.repo.get_all()

    def get_task(self, task_id: int) -> Optional[Task]:
        return self.repo.get_by_id(task_id)

    def create_task(self, data: TaskCreate) -> Task:
        task = Task(
            title=data.title,
            description=data.description,
            type=data.type,
            status=data.status,
            deadline_at=data.deadline_at,
            scheduled_start=data.scheduled_start,
            scheduled_end=data.scheduled_end,
        )
        return self.repo.create(task)
