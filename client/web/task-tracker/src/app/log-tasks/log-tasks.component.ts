import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-log-tasks',
  templateUrl: './log-tasks.component.html',
  styleUrls: ['./log-tasks.component.css']
})
export class LogTasksComponent implements OnInit {
  userTaskLog: any[];
  results: any;
  constructor(private api: ApiService) { }

  ngOnInit() {
    this.api.getUserTasks(this.retrieveUserId(), this.retrieveUserAuth()).subscribe(res => {
      this.results = res;
      if(this.results.success){
        this.userTaskLog = this.results.tasks
      }
    })
  }

  private retrieveUserAuth(): String{
    const userAuth = localStorage.getItem("gauth") //Retrieve user id from Local Storage and convert to integer(base 2)
    return userAuth;
  }

  private retrieveUserId(): Number{
    const userId = parseInt(localStorage.getItem("tracker"), 2) //Retrieve user id from Local Storage and convert to integer(base 2)
    return userId;
  }

}
