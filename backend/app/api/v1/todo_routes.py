from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db import get_db
from app.services.todo_service import TodoService
from app.schemas.todo import (
    TodoListCreate, TodoListRead,
    TodoItemCreate, TodoItemRead
)

router = APIRouter(prefix="/todos", tags=["Todos"])

# ---- Todo Lists Routes ----

@router.post("/lists", response_model=TodoListRead)
def create_list(data: TodoListCreate, db: Session = Depends(get_db)):
    service = TodoService(db)
    return service.create_list(data.title)

@router.get("/lists", response_model=list[TodoListRead])
def get_lists(db: Session = Depends(get_db)):
    service = TodoService(db)
    return service.get_lists()

@router.put("/lists/{list_id}", response_model=TodoListRead)
def update_list(list_id: int, data: TodoListCreate, db: Session = Depends(get_db)):
    service = TodoService(db)
    return service.update_list(list_id, data.title)

@router.delete("/lists/{list_id}")
def delete_list(list_id: int, db: Session = Depends(get_db)):
    service = TodoService(db)
    service.delete_list(list_id)
    return {"status": "deleted"}

# ---- Todo Items Routes ----

@router.get("/lists/{list_id}/items", response_model=list[TodoItemRead])
def get_items(list_id: int, db: Session = Depends(get_db)):
    service = TodoService(db)
    return service.get_list_items(list_id)

@router.post("/lists/{list_id}/items", response_model=TodoItemRead)
def add_item(list_id: int, data: TodoItemCreate, db: Session = Depends(get_db)):
    service = TodoService(db)
    return service.add_item(list_id, data.title)

@router.put("/items/{item_id}", response_model=TodoItemRead)
def update_item(item_id: int, data: TodoItemCreate, db: Session = Depends(get_db)):
    service = TodoService(db)
    return service.update_item(item_id, data.title)

@router.patch("/items/{item_id}", response_model=TodoItemRead)
def toggle_item(item_id: int, db: Session = Depends(get_db)):
    service = TodoService(db)
    return service.toggle_item(item_id)

@router.delete("/items/{item_id}")
def delete_item(item_id: int, db: Session = Depends(get_db)):
    service = TodoService(db)
    service.delete_item(item_id)
    return {"status": "deleted"}
