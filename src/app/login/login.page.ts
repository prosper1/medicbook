import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Platform } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loading: any;

  constructor(private loginService: LoginService, private platform: Platform, private router: Router, private  afAuth: AngularFireAuth,  public loadingController: LoadingController, private google: GooglePlus ) {

  }

  async ngOnInit() {
    this.loading = await this.loadingController.create({
      message: 'Connecting ...'
    });
  }


  signInGmail() {


    if (this.platform.is('mobileweb')) {
    this.loginService.googleSignin();
    } else if (this.platform.is('desktop')) {
      this.loginService.googleSignin();
    } else {

      this.login();

    }

  }

  async presentLoading(loading) {
    await loading.present();
  }


  async login() {
    let params;
    if (this.platform.is('android')) {
      params = {
        // tslint:disable-next-line:object-literal-key-quotes
        'scopes': 'profile',
        // tslint:disable-next-line:object-literal-key-quotes
        'webClientId': '1077553925466-8ske7ap3u16s4gv6gmvdgfh3pui3hsea.apps.googleusercontent.com',
        offline: true
      };
    } else {
      params = {};
    }
    this.google.login(params)
      .then((response) => {
        const { idToken, accessToken } = response;
        this.onLoginSuccess(idToken, accessToken);
      }).catch((error) => {
        console.log(error);
        alert('error:' + JSON.stringify(error));
      });
  }
  onLoginSuccess(accessToken, accessSecret) {
    const credential = accessSecret ? firebase.auth.GoogleAuthProvider
        .credential(accessToken, accessSecret) : firebase.auth.GoogleAuthProvider
            .credential(accessToken);
    this.afAuth.auth.signInWithCredential(credential)
      .then((response) => {

        this.loading.dismiss();
        this.router.navigate(['/tabs']);

      });

  }
  onLoginError(err) {
    console.log(err);
  }

  
}
