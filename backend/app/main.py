# app/main.py
from fastapi import FastAPI

from .api.v1 import task_routes
from .db import engine, Base

app = FastAPI(
    title="Schedule Planner Backend",
    version="0.1.0",
)


@app.on_event("startup")
def on_startup():
    # For dev only: create tables automatically
    Base.metadata.create_all(bind=engine)


app.include_router(task_routes.router, prefix="/api/v1")


@app.get("/health")
def health_check():
    return {"status": "ok"}
