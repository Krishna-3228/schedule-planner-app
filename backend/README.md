backend/
├─ Dockerfile
├─ pyproject.toml        # or requirements.txt + setup.cfg, etc.
├─ alembic.ini           # if you use Alembic for migrations
├─ .env.example          # sample env vars (DATABASE_URL, etc.)
├─ README.md

├─ app/
│  ├─ __init__.py
│  ├─ main.py            # FastAPI app entrypoint
│  ├─ config.py          # settings (read from env, pydantic BaseSettings)
│  ├─ db.py              # engine, SessionLocal, Base, DB init
│  ├─ dependencies.py    # common FastAPI dependencies (get_db, etc.)

│  ├─ models/            # SQLAlchemy models (DB tables)
│  │  ├─ __init__.py
│  │  └─ task.py         # Task, enums, etc.

│  ├─ schemas/           # Pydantic models (request/response)
│  │  ├─ __init__.py
│  │  └─ task.py         # TaskCreate, TaskUpdate, TaskRead...

│  ├─ repositories/      # Data access layer (TaskRepository)
│  │  ├─ __init__.py
│  │  └─ task_repository.py

│  ├─ services/          # Application/business logic
│  │  ├─ __init__.py
│  │  └─ task_service.py # higher-level operations using repository

│  ├─ api/               # Route definitions
│  │  ├─ __init__.py
│  │  ├─ v1/
│  │  │  ├─ __init__.py
│  │  │  └─ task_routes.py  # /tasks endpoints

│  ├─ core/              # Core utilities, security, constants
│  │  ├─ __init__.py
│  │  └─ logging.py      # logger setup (optional for later)

│  └─ migrations/        # Alembic migration scripts (if using Alembic)
│     └─ versions/
│        └─ ...          # auto-generated migration files

└─ tests/
   ├─ __init__.py
   ├─ test_tasks_api.py  # API tests
   └─ test_services.py   # service-layer tests
