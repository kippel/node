from fastapi import FastAPI
from api.database import db

app = FastAPI()

@app.get("/ping")
async def pong():
    users = await db.users.find().to_list(100)
    return {"ping": "pong!", "user" : users}