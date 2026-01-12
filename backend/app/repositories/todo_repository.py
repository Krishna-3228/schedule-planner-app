# app/repositories/todo_repository.py
from sqlalchemy.orm import Session
from app.models.todo_list import TodoList
from app.models.todo_item import TodoItem

class TodoRepository:
    def __init__(self, db: Session):
        self.db = db

    # ---- Lists ----

    def create_list(self, title: str) -> TodoList:
        todo_list = TodoList(title=title)
        self.db.add(todo_list)
        self.db.commit()
        self.db.refresh(todo_list)
        return todo_list

    def get_lists(self):
        return self.db.query(TodoList).all()
    
    def get_list_by_id(self, list_id: int) -> TodoList | None:
        return self.db.query(TodoList).filter(TodoList.id == list_id).first()
    
    def delete_list(self, list_id: int):
        todo_list = self.get_list_by_id(list_id)
        if todo_list:
            self.db.delete(todo_list)
            self.db.commit()

    # ---- Items ----

    def create_item(self, list_id: int, title: str) -> TodoItem:
        position = (
            self.db.query(TodoItem)
            .filter(TodoItem.list_id == list_id)
            .count()
        )

        item = TodoItem(
            list_id=list_id,
            title=title,
            position=position,
        )
        self.db.add(item)
        self.db.commit()
        self.db.refresh(item)
        return item

    def get_item(self, item_id: int) -> TodoItem | None:
        return self.db.query(TodoItem).filter(TodoItem.id == item_id).first()

    def delete_item(self, item_id: int):
        item = self.get_item(item_id)
        if item:
            self.db.delete(item)
            self.db.commit()
