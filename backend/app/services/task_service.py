from fastapi import HTTPException
# app/services/task_service.py
from sqlalchemy.orm import Session
from typing import List
from datetime import datetime

from ..models.task import Task, TaskType, TaskStatus 
from ..models.daily_task import DailyTaskMeta
from ..models.deadline_task import DeadlineTaskMeta
from ..models.scheduled_task import ScheduledTaskMeta
from ..repositories.task_repository import TaskRepository
from ..schemas import (
    DailyTaskCreate, DailyTaskRead,
    DeadlineTaskCreate, DeadlineTaskRead,
    ScheduledTaskCreate, ScheduledTaskRead,
    TaskUpdate
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
            status=data.status,
            created_at=datetime.now()
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
            status=data.status,
            created_at=datetime.now()
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
            status=data.status,
            created_at=datetime.now()
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

    def list_tasks(self, type: TaskType | None = None, status: TaskStatus | None = None):
        tasks = self.repo.get_tasks(type=type, status=status)
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
        
    def update_task(self, task_id: int, data: TaskUpdate):
        task = self.repo.get_task_by_id(task_id)
        if not task:
            raise HTTPException(404, "Task not found")

        if data.type != task.type:
            raise HTTPException(400, "Task type cannot be changed")

        # ----- Base fields (always replaced) -----
        task.title = data.title
        task.description = data.description
        task.status = data.status

        # ----- Type-specific fields -----
        if task.type == TaskType.DAILY:
            meta = self.repo.get_daily_meta(task.id)
            meta.repeat_rule = data.repeat_rule
            meta.priority = data.priority

        elif task.type == TaskType.DEADLINE:
            meta = self.repo.get_deadline_meta(task.id)
            meta.deadline_at = data.deadline_at
            meta.reminder_at = data.reminder_at

        else:  # SCHEDULED
            meta = self.repo.get_scheduled_meta(task.id)
            meta.scheduled_start = data.scheduled_start
            meta.scheduled_end = data.scheduled_end
            meta.location = data.location

        self.repo.commit()
        self.repo.refresh(task)

        return self.repo.get_task_by_id(task_id)

    def get_task(self, task_id: int):
        task = self.repo.get_task_by_id(task_id)
        if not task:
            raise HTTPException(status_code=404, detail="Task not found")

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
            return (DailyTaskRead.model_validate(base))

        elif task.type == TaskType.DEADLINE:
            meta = self.repo.get_deadline_meta(task.id)
            if meta:
                base.update({
                    "deadline_at": meta.deadline_at,
                    "reminder_at": meta.reminder_at,
                })
            return (DeadlineTaskRead.model_validate(base))

        else:  # SCHEDULED
            meta = self.repo.get_scheduled_meta(task.id)
            if meta:
                base.update({
                    "scheduled_start": meta.scheduled_start,
                    "scheduled_end": meta.scheduled_end,
                    "location": meta.location,
                })
            return (ScheduledTaskRead.model_validate(base))
        
    # --------- DELETE ---------
    
    def delete_task(self, task_id: int):
        task = self.repo.get_task_by_id(task_id)
        if not task:
            return None

        if task.type == TaskType.DAILY:
            meta = self.repo.get_daily_meta(task.id)
            self.repo.delete_daily_meta(meta)

        elif task.type == TaskType.DEADLINE:
            meta = self.repo.get_deadline_meta(task.id)
            self.repo.delete_deadline_meta(meta)

        else:  # SCHEDULED
            meta = self.repo.get_scheduled_meta(task.id)
            self.repo.delete_scheduled_meta(meta)

        self.repo.delete_task(task)
        self.repo.commit()

        return {"message": "Task deleted successfully", "task_id": task_id}
