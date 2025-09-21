import os
from motor.motor_asyncio import AsyncIOMotorClient

MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017/mydatabase")
client = AsyncIOMotorClient(MONGO_URI)
db = client.get_default_database()