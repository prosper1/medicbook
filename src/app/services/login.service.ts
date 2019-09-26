import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class LoginService {





  constructor(public afAuth: AngularFireAuth, private router: Router, private afs: AngularFirestore) { }




  async googleSignin() {
    const provider = new auth.GoogleAuthProvider();
    const credential = await this.afAuth.auth.signInWithPopup(provider).then(()  => {

      this.router.navigateByUrl('tabs');


    });
  }


  async signOut() {
    await this.afAuth.auth.signOut();
    this.router.navigateByUrl('login');
  }

}
