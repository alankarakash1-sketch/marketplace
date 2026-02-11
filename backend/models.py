from pymongo import MongoClient
import os
from dotenv import load_dotenv

load_dotenv()

client = MongoClient(os.getenv("mongodb+srv://testingdb:intern_112@testing.jah4ika.mongodb.net/?retryWrites=true&w=majority&appName=testing"))
db = client['audio_marketplace']

users = db['users']
products = db['products']
carts = db['carts']
