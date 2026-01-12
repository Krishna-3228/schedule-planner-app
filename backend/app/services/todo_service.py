from app.repositories.todo_repository import TodoRepository
from fastapi import HTTPException

class TodoService:
    def __init__(self, db):
        self.repo = TodoRepository(db)

    def create_list(self, title: str):
        return self.repo.create_list(title)

    def get_lists(self):
        return self.repo.get_lists()
    
    def update_list(self, list_id: int, title: str):
        todo_list = self.repo.get_list_by_id(list_id)
        if not todo_list:
            raise HTTPException(404, "List not found")
        
        todo_list.title = title
        self.repo.db.commit()
        self.repo.db.refresh(todo_list)
        return todo_list
    
    def delete_list(self, list_id: int):
        todo_list = self.repo.get_list_by_id(list_id)
        if not todo_list:
            raise HTTPException(404, "List not found")
        
        self.repo.db.delete(todo_list)
        self.repo.db.commit()

    def get_list_items(self, list_id: int):
        todo_list = self.repo.get_list_by_id(list_id)
        if not todo_list:
            return []
        return todo_list.items

    def add_item(self, list_id: int, title: str):
        todo_list = self.repo.get_list_by_id(list_id)
        if not todo_list:
            raise HTTPException(404, "List not found")
        return self.repo.create_item(list_id, title)
    
    def update_item(self, item_id: int, title: str):
        item = self.repo.get_item(item_id)
        if not item:
            raise HTTPException(404, "Item not found")
        
        item.title = title
        self.repo.db.commit()
        self.repo.db.refresh(item)
        return item

    def toggle_item(self, item_id: int):
        item = self.repo.get_item(item_id)
        if not item:
            raise HTTPException(404, "Item not found")

        item.is_done = not item.is_done
        self.repo.db.commit()
        self.repo.db.refresh(item)
        return item

    def delete_item(self, item_id: int):
        item = self.repo.get_item(item_id)
        if not item:
            raise HTTPException(404, "Item not found")
        self.repo.delete_item(item_id)
