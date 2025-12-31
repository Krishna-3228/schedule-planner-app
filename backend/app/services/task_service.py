# app/services/task_service.py
from sqlalchemy.orm import Session
from typing import List

from ..models.task import Task, TaskType
from ..models.daily_task import DailyTaskMeta
from ..models.deadline_task import DeadlineTaskMeta
from ..models.scheduled_task import ScheduledTaskMeta
from ..repositories.task_repository import TaskRepository
from ..schemas import (
    DailyTaskCreate, DailyTaskRead,
    DeadlineTaskCreate, DeadlineTaskRead,
    ScheduledTaskCreate, ScheduledTaskRead,
)


class TaskService:
    def __init__(self, db: Session):
        self.repo = TaskRepository(db)

    # ---------- CREATE ----------

    def create_daily(self, data: DailyTaskCreate):
        task = Task(
            title=data.title,
            description=data.description,
            type=TaskType.DAILY,
        )

        task = self.repo.create_task(task)

        meta = DailyTaskMeta(
            task_id=task.id,
            repeat_rule=data.repeat_rule,
            priority=data.priority,
        )

        self.repo.create_daily_meta(meta)
        self.repo.commit()
        self.repo.refresh(task)

        return task, meta

    def create_deadline(self, data: DeadlineTaskCreate):
        task = Task(
            title=data.title,
            description=data.description,
            type=TaskType.DEADLINE,
        )

        task = self.repo.create_task(task)

        meta = DeadlineTaskMeta(
            task_id=task.id,
            deadline_at=data.deadline_at,
            reminder_at=data.reminder_at,
        )

        self.repo.create_deadline_meta(meta)
        self.repo.commit()
        self.repo.refresh(task)

        return task, meta

    def create_scheduled(self, data: ScheduledTaskCreate):
        task = Task(
            title=data.title,
            description=data.description,
            type=TaskType.SCHEDULED,
        )

        task = self.repo.create_task(task)

        meta = ScheduledTaskMeta(
            task_id=task.id,
            scheduled_start=data.scheduled_start,
            scheduled_end=data.scheduled_end,
            location=data.location,
        )

        self.repo.create_scheduled_meta(meta)
        self.repo.commit()
        self.repo.refresh(task)

        return task, meta

    # ---------- READ ----------

    def list_all_tasks(self):
        tasks = self.repo.get_all_tasks()
        results = []

        for task in tasks:
            base = {
                "id": task.id,
                "title": task.title,
                "description": task.description,
                "type": task.type,
                "status": task.status,
                "created_at": task.created_at,
                "updated_at": task.updated_at,
            }

            if task.type == TaskType.DAILY:
                meta = self.repo.get_daily_meta(task.id)
                if meta:
                    base.update({
                        "repeat_rule": meta.repeat_rule,
                        "priority": meta.priority,
                    })
                results.append(DailyTaskRead.model_validate(base))

            elif task.type == TaskType.DEADLINE:
                meta = self.repo.get_deadline_meta(task.id)
                if meta:
                    base.update({
                        "deadline_at": meta.deadline_at,
                        "reminder_at": meta.reminder_at,
                    })
                results.append(DeadlineTaskRead.model_validate(base))

            else:  # SCHEDULED
                meta = self.repo.get_scheduled_meta(task.id)
                if meta:
                    base.update({
                        "scheduled_start": meta.scheduled_start,
                        "scheduled_end": meta.scheduled_end,
                        "location": meta.location,
                    })
                results.append(ScheduledTaskRead.model_validate(base))

        return results