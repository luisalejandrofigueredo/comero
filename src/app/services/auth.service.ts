import { Injectable,inject,NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { User } from '../interfaces/user';
import * as auth from 'firebase/auth';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private angularFireStore=inject(AngularFirestore);
  private angularFireAuth=inject(AngularFireAuth);
  private router=inject(Router);
  private userData: any;

  constructor () {
    this.angularFireAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
      } else {
        localStorage.setItem('user', 'null');
      }
    });
  }

  // Sign in with email/password
  SignIn(email: string, password: string) {
    return this.angularFireAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.SetUserData(result.user);
        this.angularFireAuth.authState.subscribe((user) => {
          if (user) {
            this.router.navigate(['']);
          }
        });
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  getUserData(){
    return this.userData
  }
  SetUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.angularFireStore.doc(
      `users/${user.uid}`
    );
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
    };
    return userRef.set(userData, {
      merge: true,
    });
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null && user.emailVerified !== false ? true : false;
  }

  SignOut() {
    return this.angularFireAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['']);
    });
  }

  GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider()).then((res: any) => {
      console.log('res google:',res)
      this.router.navigate(['']);
    });
  }

  AuthLogin(provider: any) {
    return this.angularFireAuth
      .signInWithPopup(provider)
      .then((result) => {
        this.SetUserData(result.user);
        this.router.navigate(['']);
      })
      .catch((error) => {
        window.alert(error);
      });
  }
}
