import axios from "axios"
const apiUrl = "https://flask-tasktracker.appspot.com/api"

export const loggedInUser = (user) => {
    axios.post(`${this.apiUrl}/login`, user)
}

export const addUserTask = (userTask) => {
    axios.post(`${this.apiUrl}/add`, userTask)
}

export const getUserTasks = (userId, userAuth) => {
    axios.post(`${this.apiUrl}/get/${userId}`, { "Auth" : userAuth })
}