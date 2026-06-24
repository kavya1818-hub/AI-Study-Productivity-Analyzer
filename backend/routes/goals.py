from flask import Blueprint, request, jsonify
from mongodb import goals_collection

goal_bp = Blueprint("goal", __name__)

@goal_bp.route("/goal", methods=["POST"])
def save_goal():

    data = request.json

    goals_collection.delete_many(
        {"email": data["email"]}
    )

    goals_collection.insert_one(data)

    return jsonify(
        {"message": "Goal Saved"}
    )


@goal_bp.route("/goal", methods=["GET"])
def get_goal():

    email = request.args.get("email")

    goal = goals_collection.find_one(
        {"email": email}
    )

    if goal:
        goal["_id"] = str(goal["_id"])
        return jsonify(goal)

    return jsonify({"target": 0})