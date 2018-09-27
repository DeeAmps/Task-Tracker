from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class Managers(db.Model):
    __tablename__ = 'managers'
    id = db.Column(db.Integer, primary_key=True)
    given_name = db.Column(db.String(250), nullable=False)
    family_name = db.Column(db.String(250), nullable=False)
    nickname = db.Column(db.String(150), unique=True, nullable=False)
    last_login_date = db.Column(db.TIMESTAMP, server_default=db.func.current_timestamp(), nullable=False)

    def __init__(self, given_name, family_name, nickname):
        self.given_name = given_name
        self.family_name = family_name
        self.nickname = nickname

class Users(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    given_name = db.Column(db.String(250), nullable=False)
    family_name = db.Column(db.String(250), nullable=False)
    nickname = db.Column(db.String(150), unique=True, nullable=False)
    last_login_date = db.Column(db.TIMESTAMP, server_default=db.func.current_timestamp(), nullable=False)
    manager_id = db.Column(db.Integer, db.ForeignKey('managers.id'), nullable=False)

    def __init__(self, given_name, family_name, nickname, manager_id):
        self.given_name = given_name
        self.family_name = family_name
        self.nickname = nickname
        self.manager_id = manager_id


class UserTasks(db.Model):
    __tablename__ = 'tasks'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    task = db.Column(db.String(1000), nullable=False)
    start_time = db.Column(db.DateTime())
    end_time = db.Column(db.DateTime())

    def __init__(self, task, user_id, start_time, end_time):
        self.task = task
        self.user_id = user_id
        self.start_time = start_time
        self.end_time = end_time
