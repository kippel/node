from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routers import auth, workouts

from .database import Base, engine

app = FastAPI()

Base.metadata.create_all(bind=engine)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods (GET, POST, PUT, DELETE, etc.)
    allow_headers=["*"],  # Allows all headers
)

from api.models import User
from api.deps import db_dependency
@app.get("/")
def root(db: db_dependency):

    user = db.query(User).all()
    
    return {"user": user}

app.include_router(auth.router)
app.include_router(workouts.router)