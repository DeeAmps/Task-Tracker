from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from config import DevelopmentConfig
from models import Users, UserTasks, Managers

app = Flask(__name__)
app.config.from_object(DevelopmentConfig)

db = SQLAlchemy(app)

@app.route("/")
def index():
    return "Live!"


if __name__ == "__main__":
    app.run()