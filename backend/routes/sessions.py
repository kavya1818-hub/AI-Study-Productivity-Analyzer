from flask import Blueprint, request, jsonify
from mongodb import sessions_collection
from bson import ObjectId

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
@session_bp.route("/sessions/<id>", methods=["DELETE"])
def delete_session(id):
    sessions_collection.delete_one(
        {"_id": ObjectId(id)}
    )

    return jsonify(
        {"message": "Session deleted successfully"}
    )


@session_bp.route("/sessions/<id>", methods=["PUT"])
def update_session(id):

    data = request.json

    sessions_collection.update_one(
        {"_id": ObjectId(id)},
        {
            "$set": {
                "subject": data["subject"],
                "duration": data["duration"],
                "focus": data["focus"],
                "distractions": data["distractions"],
                "notes": data["notes"],
            }
        }
    )

    return jsonify(
        {"message": "Session updated successfully"}
    )