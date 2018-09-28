import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css']
})
export class ManagerComponent implements OnInit {
  tasklogs: any;
  constructor(private api: ApiService) { }

  ngOnInit() {
    this.api.getEmployeeTasks(this.retrieveUserId(), this.retrieveUserAuth()).subscribe(res => {
      this.tasklogs = res
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
