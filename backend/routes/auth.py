from flask import Blueprint, request, jsonify
from mongodb import users_collection

auth_bp = Blueprint("auth", __name__)

@auth_bp.route("/register", methods=["POST"])
def register():
    data = request.json

    existing = users_collection.find_one(
        {"email": data["email"]}
    )

    if existing:
        return jsonify(
            {"message": "User already exists"}
        ), 400

    users_collection.insert_one(data)

    return jsonify(
        {"message": "Registration Successful"}
    )


@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.json

    user = users_collection.find_one(
        {
            "email": data["email"],
            "password": data["password"]
        }
    )

    if not user:
        return jsonify(
            {"message": "Invalid Credentials"}
        ), 401

    return jsonify(
        {
            "message": "Login Successful",
            "name": user["name"]
        }
    )