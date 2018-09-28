import { Component, OnInit } from '@angular/core';
import { AuthService } from "../auth/auth.service";
import { ApiService } from "../api.service";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  profile: any;
  constructor(private auth: AuthService, private api: ApiService) { }

  ngOnInit() {
    this.auth.handleAuthentication().then((value) => {
      if(value){
        if (this.auth.userProfile) {
          this.profile = this.auth.userProfile;
        } else {
          this.auth.getProfile((err, profile) => {
            this.api.loggedInUser(profile).subscribe(res => {
              this.storeUserIdAndAuthField(res);
              this.profile = res;
            });
          });
        }
      }
    });
  }

  private storeUserIdAndAuthField(user): void{
    localStorage.setItem("tracker", user.userId.toString(2)); //Store user id in Local Storage as binary. Weak security though
    localStorage.setItem("gauth", user.Auth); //Store user id in Local Storage as binary. Weak security though
  }

  public logout(): void {
    this.auth.logout();
  }

}
