import { Component, OnInit } from '@angular/core';
import { AuthService } from "../auth/auth.service";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  profile: any;
  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.auth.handleAuthentication().then((value) => {
      if(value){
        if (this.auth.userProfile) {
          this.profile = this.auth.userProfile;
        } else {
          this.auth.getProfile((err, profile) => {
            this.profile = profile;
            console.log(this.profile)
          });
        }
      }
    });
  }

  public logout(): void {
    this.auth.logout();
}

}
