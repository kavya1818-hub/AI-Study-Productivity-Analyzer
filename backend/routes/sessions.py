from flask import Blueprint, request, jsonify
from mongodb import sessions_collection

session_bp = Blueprint("session", __name__)

@session_bp.route("/sessions", methods=["POST"])
def save_session():

    data = request.json

    sessions_collection.insert_one(data)

    return jsonify(
        {"message": "Session Saved"}
    )


@session_bp.route("/sessions", methods=["GET"])
def get_sessions():

    email = request.args.get("email")

    sessions = []

    for session in sessions_collection.find(
        {"email": email}
    ):

        session["_id"] = str(session["_id"])

        sessions.append(session)

    return jsonify(sessions)