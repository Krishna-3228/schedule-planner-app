# app/api/v1/task_routes.py
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db import get_db
from app.models.task import TaskType, TaskStatus
from app.services.task_service import TaskService
from app.schemas.task_base import TaskRead
from app.schemas import (
    DailyTaskRead,
    DailyTaskCreate,
    DeadlineTaskRead,
    DeadlineTaskCreate,
    ScheduledTaskRead,
    ScheduledTaskCreate,
)

router = APIRouter(prefix="/tasks", tags=["Tasks"])

@router.get("/", response_model=list[DailyTaskRead | DeadlineTaskRead | ScheduledTaskRead])
def list_all_tasks(
    type: TaskType | None = None,
    status: TaskStatus | None = None,
    db: Session = Depends(get_db)
):
    service = TaskService(db)
    return service.list_tasks(type=type, status=status)

@router.post("/daily")
def create_daily_task(data: DailyTaskCreate, db: Session = Depends(get_db)):
    service = TaskService(db)
    task, meta = service.create_daily(data)
    return {"task": task, "meta": meta}


@router.post("/deadline")
def create_deadline_task(data: DeadlineTaskCreate, db: Session = Depends(get_db)):
    service = TaskService(db)
    task, meta = service.create_deadline(data)
    return {"task": task, "meta": meta}


@router.post("/scheduled")
def create_scheduled_task(data: ScheduledTaskCreate, db: Session = Depends(get_db)):
    service = TaskService(db)
    task, meta = service.create_scheduled(data)
    return {"task": task, "meta": meta}
