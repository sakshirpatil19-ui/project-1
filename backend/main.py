from typing import List, Optional
from fastapi import Depends, FastAPI, HTTPException, Query, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

import crud
import models
import schemas
from database import Base, engine, get_db

# Create SQLite database tables if they do not exist
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="To-Do List API",
    description="FastAPI + SQLAlchemy backend for managing tasks",
    version="1.0.0",
)

# Enable CORS for frontend development
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "*",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/", tags=["Health"])
def root():
    return {"message": "To-Do List API is up and running!"}


@app.get("/api/todos", response_model=List[schemas.TodoResponse], tags=["Todos"])
def read_todos(
    is_completed: Optional[bool] = Query(None, description="Filter by status"),
    search: Optional[str] = Query(None, description="Search in todo title"),
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=200),
    db: Session = Depends(get_db),
):
    """Retrieve all to-do items with optional status filter and title search."""
    return crud.get_todos(
        db=db,
        skip=skip,
        limit=limit,
        is_completed=is_completed,
        search=search,
    )


@app.post(
    "/api/todos",
    response_model=schemas.TodoResponse,
    status_code=status.HTTP_201_CREATED,
    tags=["Todos"],
)
def create_todo(todo: schemas.TodoCreate, db: Session = Depends(get_db)):
    """Create a new to-do task."""
    if not todo.title.strip():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Title cannot be empty.",
        )
    return crud.create_todo(db=db, todo=todo)


@app.get("/api/todos/{todo_id}", response_model=schemas.TodoResponse, tags=["Todos"])
def read_todo(todo_id: int, db: Session = Depends(get_db)):
    """Fetch a single to-do by its ID."""
    db_todo = crud.get_todo_by_id(db=db, todo_id=todo_id)
    if not db_todo:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Todo with id {todo_id} not found.",
        )
    return db_todo


@app.patch("/api/todos/{todo_id}", response_model=schemas.TodoResponse, tags=["Todos"])
def update_todo(
    todo_id: int, todo_update: schemas.TodoUpdate, db: Session = Depends(get_db)
):
    """Update to-do task fields (title, description, or is_completed)."""
    updated = crud.update_todo(db=db, todo_id=todo_id, todo_update=todo_update)
    if not updated:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Todo with id {todo_id} not found.",
        )
    return updated


@app.delete(
    "/api/todos/{todo_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    tags=["Todos"],
)
def delete_todo(todo_id: int, db: Session = Depends(get_db)):
    """Delete a to-do item."""
    success = crud.delete_todo(db=db, todo_id=todo_id)
    if not success:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Todo with id {todo_id} not found.",
        )
    return None
