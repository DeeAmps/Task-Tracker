import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserTask } from './custom/UserTask';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl:string = " http://127.0.0.1:5000/api"
  constructor(private http: HttpClient) { }

  loggedInUser(user){
    return this.http.post(`${this.apiUrl}/login`, user);
  }

  addUserTask(userTask: UserTask){
    return this.http.post(`${this.apiUrl}/add`, userTask);
  }

  getUserTasks(userId, userAuth){
    return this.http.post(`${this.apiUrl}/get/${userId}`, { "Auth" : userAuth })
  }
}
