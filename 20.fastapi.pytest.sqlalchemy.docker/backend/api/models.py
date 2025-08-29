from api.database import Base
from sqlalchemy import TIMESTAMP, Column, String, Boolean
from sqlalchemy.sql import func
from sqlalchemy_utils import UUIDType
import uuid

class User(Base):
    __tablename__ = "users"
    id = Column(UUIDType(binary=False), primary_key=True, default=uuid.uuid4)

    username = Column(String, nullable=False, index=True)  
    password = Column(String)
    