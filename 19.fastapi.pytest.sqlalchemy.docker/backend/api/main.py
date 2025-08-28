from api import models

from api.database import engine, get_db
from .routers import users
from fastapi import FastAPI

models.Base.metadata.create_all(bind=engine)

app = FastAPI()


@app.get("/ping")
async def pong():

    return {"ping": "pong!"}


app.include_router(users.router)