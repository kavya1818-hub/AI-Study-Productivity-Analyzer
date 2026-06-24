from pymongo import MongoClient
from config import MONGO_URI

client = MongoClient(MONGO_URI)

db = client["ai_study_db"]

users_collection = db["users"]
sessions_collection = db["sessions"]
goals_collection = db["goals"]