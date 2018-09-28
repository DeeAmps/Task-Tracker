from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from config import DevelopmentConfig
from models import Users, UserTasks, Managers
from datetime import datetime

app = Flask(__name__)
CORS(app)
app.config.from_object(DevelopmentConfig)

db = SQLAlchemy(app)

@app.route("/api/employeelogs/<userId>", methods=["POST"])
def getManagerEmployeeLogs(userId):
    user = Users.query.filter_by(id=userId, oauth2=request.json["Auth"]).first()
    checkManager = True if Managers.query.filter_by(id=user.id) else False
    if user is not None and checkManager:
        manager = Managers.query.filter_by(nickname=user.nickname).first()
        sqlQuery = f"SELECT users.family_name, users.nickname, users.last_login_date, tasks.task, tasks.start_time, tasks.end_time, tasks.task_date FROM users INNER JOIN tasks ON users.id = tasks.user_id WHERE users.manager_id = {manager.id}"
        employeeTasks = db.engine.execute(sqlQuery).fetchall()
        results = []
        for row in employeeTasks:
            rowSerialized = {
                "family_name": row[0],
                "nickname": row[1],
                "last_login_date": row[2],
                "task": row[3],
                "start_time": row[4],
                "end_time": row[5],
                "task_date": row[6],
            }
            results.append(rowSerialized)
        return jsonify(results)
    else:
        return jsonify({"success": False, "message": "You are not authorised to this endpoint"})

@app.route("/api/get/<userId>", methods=["POST"])
def getUserTasks(userId):
        user = Users.query.filter_by(id=userId, oauth2=request.json["Auth"]).first() # check if user exists
        if user is not None:
            tasks = [task.serialize() for task in (UserTasks.query.filter_by(user_id=user.id))]
            return jsonify({"success": True, "tasks": tasks})
        else:
            return jsonify({"success": False, "message": "Non logged in user"})


@app.route("/api/add", methods=["POST"])
def addTasks():
    user = Users.query.filter_by(id=request.json["UserId"], oauth2=request.json["Auth"]).first() # check if user exists
    if user is not None:
        newUserTask = UserTasks(
                                    request.json["task"],
                                    request.json["UserId"],
                                    request.json["taskStartTime"],
                                    request.json["taskEndTime"],
                                )
        db.session.add(newUserTask)
        db.session.commit()
        return jsonify({"success" : True})
    else:
        return jsonify({"success": False, "message": "Non user"})

@app.route("/api/login", methods=["POST"])
def login():
    user = Users.query.filter_by(nickname=request.json["nickname"]).first()
    print(f"User {user}")
    if user is None:
        newUser = Users(
                            request.json["given_name"], 
                            request.json["family_name"], 
                            request.json["nickname"], 
                            1,
                            request.json["sub"]
                        )
        db.session.add(newUser) # data user to database if no user is found
        db.session.commit()
        return jsonify(newUser.serialize())
    else:
        checkManager = True if Managers.query.filter_by(id=user.id) else False
        user.last_login_date = datetime.now() # Update only last login date if user data is found
        user.oauth2 = request.json["sub"]
        db.session.commit()
        return jsonify({"userData" : user.serialize(), "isManager": checkManager})


if __name__ == "__main__":
    app.run()