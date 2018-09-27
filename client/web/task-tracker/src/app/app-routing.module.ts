import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from "./login/login.component"
import { HomeComponent } from "./home/home.component"
import { AddTaskComponent } from "./add-task/add-task.component"
import { LogTasksComponent } from "./log-tasks/log-tasks.component"


const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'home', component: HomeComponent, children:[
    { path: 'add', component: AddTaskComponent },
    { path: 'logs', component: LogTasksComponent },
  ] },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule {}
