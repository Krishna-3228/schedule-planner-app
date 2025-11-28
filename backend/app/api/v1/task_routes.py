# app/api/v1/task_routes.py
from typing import List, Optional

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session

from ...dependencies import get_db
from ...services.task_service import TaskService
from ...schemas.task import TaskCreate, TaskRead, TaskUpdate
from ...models.task import TaskType, TaskStatus

router = APIRouter(prefix="/tasks", tags=["tasks"])


@router.get("/", response_model=List[TaskRead])
def list_tasks(
    task_type: Optional[TaskType] = Query(default=None, alias="type"),
    status: Optional[TaskStatus] = None,
    db: Session = Depends(get_db),
):
    """
    List tasks, optionally filtered by type and/or status.
    Example: /api/v1/tasks?type=DEADLINE&status=TODO
    """
    service = TaskService(db)
    return service.list_tasks(task_type, status)


@router.post("/", response_model=TaskRead, status_code=201)
def create_task(payload: TaskCreate, db: Session = Depends(get_db)):
    service = TaskService(db)
    task = service.create_task(payload)
    return task


@router.get("/{task_id}", response_model=TaskRead)
def get_task(task_id: int, db: Session = Depends(get_db)):
    service = TaskService(db)
    task = service.get_task(task_id)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    return task


@router.put("/{task_id}", response_model=TaskRead)
def update_task(task_id: int, payload: TaskUpdate, db: Session = Depends(get_db)):
    service = TaskService(db)
    task = service.update_task(task_id, payload)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    return task


@router.delete("/{task_id}", status_code=204)
def delete_task(task_id: int, db: Session = Depends(get_db)):
    service = TaskService(db)
    ok = service.delete_task(task_id)
    if not ok:
        raise HTTPException(status_code=404, detail="Task not found")
    # 204 No Content → nothing in response body
    return None
