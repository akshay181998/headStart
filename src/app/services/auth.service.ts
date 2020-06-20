import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs';
import { promise } from 'protractor';
import * as firebase from 'firebase/app';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor( private afsAuth: AngularFireAuth ) { }


  login(email: string, password: string) {
    return new Promise((resolve , reject) => {
      this.afsAuth.auth.signInWithEmailAndPassword(email , password).then(userData => resolve(userData) , err => reject(err));
    });
  }

  logOut () {
    this.afsAuth.auth.signOut();
  }

  getAuth () {
    return this.afsAuth.authState.pipe(auth => auth);
  }

  register(email: string , password: string) {
    return new Promise ((resolve , reject) => {
      this.afsAuth.auth.createUserWithEmailAndPassword(email, password).then(userData => resolve(userData) , err => reject(err));
    });
  }

  registerWithGoogle() {
    this.afsAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

}
