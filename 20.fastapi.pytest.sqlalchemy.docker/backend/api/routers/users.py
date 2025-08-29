
from sqlalchemy.orm import Session
from fastapi import Depends, APIRouter
from api.database import get_db
from api import models

router = APIRouter()

@router.get("/")
def get_user(db: Session = Depends(get_db)):

    user = db.query(models.User).all()

    return { "user" : user}