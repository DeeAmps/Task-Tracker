import { Component, OnInit } from '@angular/core';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { UserTask } from "../custom/UserTask"
import { ApiService } from '../api.service';


@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
  task: string = '';
  taskStart: any;
  taskEnd: any;
  taskRes: any;
  constructor(private spinnerService: Ng4LoadingSpinnerService, 
              private api: ApiService) { }

  ngOnInit() {    
  }

  private retrieveUserId(): Number{
    const userId = parseInt(localStorage.getItem("tracker"), 2) //Retrieve user id from Local Storage and convert to integer(base 2)
    return userId;
  }

  private retrieveUserAuth(): String{
    const userAuth = localStorage.getItem("gauth") //Retrieve user id from Local Storage and convert to integer(base 2)
    return userAuth;
  }

  // private flashMessage(message, type): void{
  //   this.ngFlashMessageService.showFlashMessage({
  //     messages: [message], 
  //     dismissible: true, 
  //     timeout: false,
  //     type: type
  //   });
  // }

  addTask() {
    const userTask = new UserTask()
    userTask.task = this.task;
    userTask.taskStartTime = this.taskStart;
    userTask.taskEndTime = this.taskEnd;
    userTask.UserId = this.retrieveUserId();
    userTask.Auth = this.retrieveUserAuth();
    this.api.addUserTask(userTask).subscribe(res => {
      this.taskRes = res;
      console.log(res)
      if(this.taskRes.success){
        // Reset Input Fields
        this.task = '';
        this.taskStart = '';
        this.taskEnd = '';
        //this.flashMessage("Task has been successfully Added", "success");
      }else{
        //this.flashMessage("Task failed to be added. Kindly Contact support", "danger");
      }
      
    })
  }

}

