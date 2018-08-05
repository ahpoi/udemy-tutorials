import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { Subject } from 'rxjs';
import { AuthData } from './auth-data.model';

@Injectable()
export class AuthService {

  authChange = new Subject<boolean>();

  private isAuthenticated = false;

  constructor(private router: Router, private afAuth: AngularFireAuth) {
  }

  registerUser(authData: AuthData) {
    this.afAuth.auth.createUserWithEmailAndPassword(authData.email, authData.password).then(result => {
      console.log(JSON.stringify(result));
      this.authSucessfully();
    }).catch(error => {
      console.log(error)
    })
  }

  login(authData: AuthData) {
    this.afAuth.auth.signInWithEmailAndPassword(authData.email, authData.password).then(result => {
      console.log(JSON.stringify(result));
      this.authSucessfully();
    }).catch(error => {
      console.log(error)
    });
  }

  logout() {
    this.authChange.next(false);
    this.router.navigate(['/login']);
    this.isAuthenticated = false
  }

  isAuth() {
    return this.isAuthenticated;
  }

  private authSucessfully() {
    this.isAuthenticated = true;
    this.authChange.next(true);
    this.router.navigate(['/training'])
  }
}
