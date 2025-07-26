from pydantic import BaseModel
from typing import Optional
from fastapi import APIRouter, status

from api.models import Workout
from api.deps import db_dependency, user_dependency

router = APIRouter(prefix="/workouts", tags=["workouts"])

class WorkoutBase(BaseModel):
    name: str
    description: Optional[str] = None

class WorkoutCreate(WorkoutBase):
    pass

@router.get("/")
def get_workouts(db: db_dependency, user: user_dependency, workout_id: int):
    print(user)
    workouts = db.query(Workout).filter(Workout.user_id == workout_id).first()
    return workouts

@router.get("/workouts")
def get_workouts(db: db_dependency, user: user_dependency):
    workouts = db.query(Workout).all()
    return workouts

@router.post("/", status_code=status.HTTP_201_CREATED)
def create_workout(db: db_dependency, user: user_dependency, workout: WorkoutCreate):
    workout_model = Workout(**workout.model_dump(), user_id=user.get("id"))
    db.add(workout_model)
    db.commit()
    db.refresh(workout_model)
    return workout_model