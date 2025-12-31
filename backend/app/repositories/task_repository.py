# app/repositories/task_repository.py
from sqlalchemy.orm import Session
from typing import List

from ..models.task import Task
from ..models.daily_task import DailyTaskMeta
from ..models.deadline_task import DeadlineTaskMeta
from ..models.scheduled_task import ScheduledTaskMeta


class TaskRepository:
    def __init__(self, db: Session):
        self.db = db

    # ---------- Base Task ----------

    def create_task(self, task: Task) -> Task:
        self.db.add(task)
        self.db.flush()
        return task

    def get_all_tasks(self) -> List[Task]:
        return self.db.query(Task).all()
    
    def get_daily_meta(self, task_id: int):
        return self.db.query(DailyTaskMeta).filter_by(task_id=task_id).first()

    def get_deadline_meta(self, task_id: int):
        return self.db.query(DeadlineTaskMeta).filter_by(task_id=task_id).first()

    def get_scheduled_meta(self, task_id: int):
        return self.db.query(ScheduledTaskMeta).filter_by(task_id=task_id).first()


    # ---------- Meta Tables ----------

    def create_daily_meta(self, meta: DailyTaskMeta):
        self.db.add(meta)

    def create_deadline_meta(self, meta: DeadlineTaskMeta):
        self.db.add(meta)

    def create_scheduled_meta(self, meta: ScheduledTaskMeta):
        self.db.add(meta)

    # ---------- Transaction Control ----------

    def commit(self):
        self.db.commit()

    def refresh(self, obj):
        self.db.refresh(obj)
