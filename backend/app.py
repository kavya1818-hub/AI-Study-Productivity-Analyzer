from flask import Flask
from flask_cors import CORS

from routes.auth import auth_bp
from routes.sessions import session_bp
from routes.goals import goal_bp

app = Flask(__name__)

CORS(app)

app.register_blueprint(auth_bp)
app.register_blueprint(session_bp)
app.register_blueprint(goal_bp)

@app.route("/")
def home():
    return {"message": "AI Study Productivity Analyzer API Running"}

if __name__ == "__main__":
    app.run(debug=True)