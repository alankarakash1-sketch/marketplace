from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from models import users, products, carts

api = Blueprint("api", __name__)

# -------- AUTH ROUTES --------
@api.route("/register", methods=["POST"])
def register():
    data = request.get_json()
    if users.find_one({"email": data['email']}):
        return jsonify({"msg": "User already exists"}), 400
    users.insert_one({
        "name": data['name'],
        "email": data['email'],
        "password": generate_password_hash(data['password'])
    })
    return jsonify({"msg": "User created"}), 201

@api.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    user = users.find_one({"email": data['email']})
    if not user or not check_password_hash(user['password'], data['password']):
        return jsonify({"msg": "Invalid credentials"}), 401
    token = create_access_token(identity=str(user['_id']))
    return jsonify({"token": token})

# -------- PRODUCTS ROUTES --------
@api.route("/products", methods=["GET"])
def get_products():
    all_products = list(products.find({}, {"_id": 0}))
    return jsonify(all_products)

# -------- CART ROUTES --------
@api.route("/cart", methods=["GET"])
@jwt_required()
def get_cart():
    user_id = get_jwt_identity()
    cart_items = list(carts.find({"user_id": user_id}, {"_id": 0}))
    return jsonify(cart_items)

@api.route("/cart", methods=["POST"])
@jwt_required()
def add_to_cart():
    user_id = get_jwt_identity()
    product = request.get_json()
    carts.insert_one({"user_id": user_id, **product})
    return jsonify({"msg": "Added to cart"})

@api.route("/cart", methods=["DELETE"])
@jwt_required()
def remove_from_cart():
    user_id = get_jwt_identity()
    product_id = request.get_json().get("id")
    carts.delete_one({"user_id": user_id, "id": product_id})
    return jsonify({"msg": "Removed from cart"})
