from pydantic import BaseModel



class TodoItemCreate(BaseModel):
    title: str

class TodoItemRead(BaseModel):
    id: int
    title: str
    is_done: bool
    position: int

class TodoListCreate(BaseModel):
    title: str

class TodoListRead(BaseModel):
    id: int
    title: str
    items: list[TodoItemRead]
