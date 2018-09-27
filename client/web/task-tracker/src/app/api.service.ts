import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl:string = ""
  constructor(private http: HttpClient) { }

  loggedInUser(user){
    return this.http.post(this.apiUrl, user);
  }
}
