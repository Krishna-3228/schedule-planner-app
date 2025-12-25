# app/services/task_service.py
from sqlalchemy.orm import Session

from ..models.task import Task, TaskType
from ..models.daily_task import DailyTaskMeta
from ..models.deadline_task import DeadlineTaskMeta
from ..models.scheduled_task import ScheduledTaskMeta
from ..schemas import (
    DailyTaskCreate,
    DeadlineTaskCreate,
    ScheduledTaskCreate,
)


class TaskService:
    def __init__(self, db: Session):
        self.db = db

    def create_daily(self, data: DailyTaskCreate):
        task = Task(title=data.title, description=data.description, type=TaskType.DAILY)
        self.db.add(task)
        self.db.flush()

        meta = DailyTaskMeta(
            task_id=task.id,
            repeat_rule=data.repeat_rule,
            priority=data.priority,
        )

        self.db.add(meta)
        self.db.commit()
        self.db.refresh(task)
        return task, meta

    def create_deadline(self, data: DeadlineTaskCreate):
        task = Task(title=data.title, description=data.description, type=TaskType.DEADLINE)
        self.db.add(task)
        self.db.flush()

        meta = DeadlineTaskMeta(
            task_id=task.id,
            deadline_at=data.deadline_at,
            reminder_at=data.reminder_at,
        )

        self.db.add(meta)
        self.db.commit()
        self.db.refresh(task)
        return task, meta

    def create_scheduled(self, data: ScheduledTaskCreate):
        task = Task(title=data.title, description=data.description, type=TaskType.SCHEDULED)
        self.db.add(task)
        self.db.flush()

        meta = ScheduledTaskMeta(
            task_id=task.id,
            scheduled_start=data.scheduled_start,
            scheduled_end=data.scheduled_end,
            location=data.location,
        )

        self.db.add(meta)
        self.db.commit()
        self.db.refresh(task)
        return task, meta
