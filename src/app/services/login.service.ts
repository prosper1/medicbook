import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import * as firebase from 'firebase';


@Injectable({
  providedIn: 'root'
})
export class LoginService {





  constructor(public afAuth: AngularFireAuth, private router: Router, private afs: AngularFirestore, private googlePlus: GooglePlus) { }




  async googleSignin() {
    const provider = new auth.GoogleAuthProvider();
    const credential = await this.afAuth.auth.signInWithPopup(provider).then(()  => {

      this.router.navigateByUrl('tabs');


    }, err => {
        // tslint:disable-next-line:no-unused-expression
        console.log('danger', err.message);
    });
  }


  async signOut() {
    await this.afAuth.auth.signOut();
    this.router.navigateByUrl('login');
  }


  async nativeGoogleLogin() {

    try {

      const gplusUser = await this.googlePlus.login({
        'webClientId:': '1077553925466-8ske7ap3u16s4gv6gmvdgfh3pui3hsea.apps.googleusercontent.com',
        offline: true,
        scopes: 'profile email'
      });


      return await this.afAuth.auth.signInWithCredential(
        firebase.auth.GoogleAuthProvider.credential(gplusUser.idToken)
      ).then(() => {
        this.router.navigateByUrl('tabs');
      });
    } catch (err) {

      console.log(err);

    }

  }

}
