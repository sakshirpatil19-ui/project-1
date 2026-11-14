from typing import List, Optional
from sqlalchemy.orm import Session

import models
import schemas


def get_todos(
    db: Session,
    skip: int = 0,
    limit: int = 100,
    is_completed: Optional[bool] = None,
    search: Optional[str] = None,
) -> List[models.Todo]:
    query = db.query(models.Todo)
    if is_completed is not None:
        query = query.filter(models.Todo.is_completed == is_completed)
    if search:
        query = query.filter(models.Todo.title.ilike(f"%{search}%"))
    return query.order_by(models.Todo.created_at.desc()).offset(skip).limit(limit).all()


def get_todo_by_id(db: Session, todo_id: int) -> Optional[models.Todo]:
    return db.query(models.Todo).filter(models.Todo.id == todo_id).first()


def create_todo(db: Session, todo: schemas.TodoCreate) -> models.Todo:
    db_todo = models.Todo(
        title=todo.title.strip(),
        description=todo.description.strip() if todo.description else None,
        is_completed=False,
    )
    db.add(db_todo)
    db.commit()
    db.refresh(db_todo)
    return db_todo


def update_todo(
    db: Session, todo_id: int, todo_update: schemas.TodoUpdate
) -> Optional[models.Todo]:
    db_todo = get_todo_by_id(db, todo_id)
    if not db_todo:
        return None

    update_data = todo_update.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_todo, field, value)

    db.commit()
    db.refresh(db_todo)
    return db_todo


def delete_todo(db: Session, todo_id: int) -> bool:
    db_todo = get_todo_by_id(db, todo_id)
    if not db_todo:
        return False
    db.delete(db_todo)
    db.commit()
    return True
