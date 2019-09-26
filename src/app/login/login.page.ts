import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {



  constructor(private loginService: LoginService, private platform: Platform) {

  }

  ngOnInit() {
  }


  signInGmail() {


    if (this.platform.is('mobileweb')) {
    this.loginService.googleSignin();
    } else if (this.platform.is('desktop')) {
      this.loginService.googleSignin();
    } else {

      this.loginService.nativeGoogleLogin();

    }

  }

}
