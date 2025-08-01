from pydantic import BaseModel
from typing import Optional
from fastapi import APIRouter, status

from api.deps import db_dependency, user_dependency

router = APIRouter(prefix="/workouts", tags=["workouts"])

@router.get("/red")
async def get_workouts(user: user_dependency):
    print(user)
    
    return {"user" : user}
