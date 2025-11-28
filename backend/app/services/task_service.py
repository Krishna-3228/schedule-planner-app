# app/services/task_service.py
from typing import List, Optional
from sqlalchemy.orm import Session

from ..models import Task, TaskType, TaskStatus
from ..schemas.task import TaskCreate, TaskUpdate
from ..repositories.task_repository import TaskRepository


class TaskService:
    def __init__(self, db: Session):
        self.repo = TaskRepository(db)

    def list_tasks(
        self,
        task_type: Optional[TaskType] = None,
        status: Optional[TaskStatus] = None,
    ) -> List[Task]:
        if task_type is not None or status is not None:
            return self.repo.get_filtered(task_type, status)
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

    def update_task(self, task_id: int, data: TaskUpdate) -> Optional[Task]:
        task = self.repo.get_by_id(task_id)
        if not task:
            return None

        # Apply only provided fields (partial update)
        if data.title is not None:
            task.title = data.title
        if data.description is not None:
            task.description = data.description
        if data.type is not None:
            task.type = data.type
        if data.status is not None:
            task.status = data.status
        if data.deadline_at is not None:
            task.deadline_at = data.deadline_at
        if data.scheduled_start is not None:
            task.scheduled_start = data.scheduled_start
        if data.scheduled_end is not None:
            task.scheduled_end = data.scheduled_end

        return self.repo.update(task)

    def delete_task(self, task_id: int) -> bool:
        task = self.repo.get_by_id(task_id)
        if not task:
            return False
        self.repo.delete(task)
        return True
