import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  loggedIn: boolean = false;
  user: any = {};

  constructor(
    public auth: AngularFireAuth,
    private route: Router,
    private location: Location
  ) {
    if (localStorage.getItem('sessionUser')) {
      this.loggedIn = true;
      const userString = localStorage.getItem('sessionUser') || '{}';
      this.user = JSON.parse(userString); 
    }
  }

  login(
    email: string,
    password: string,
    setError: (errorText: string) => void
  ) {
    if (!email || !password) {
      setError('Please fill in all inputs');
    } else {
      this.auth
        .signInWithEmailAndPassword(email, password)
        .then((res: any) => {
          this.loggedIn = true;
          localStorage.setItem(
            'sessionUser',
            JSON.stringify({
              email: res.user._delegate.email,
              id: res.user._delegate.uid,
            })
          );
          this.location.back();
        })
        .catch((e) => {
          console.log(e);
          if (e.code === 'auth/wrong-password') {
            setError('Wrong Password');
          } else if (e.code === 'auth/user-not-found') {
            setError('User Not Found');
          }
        });
    }
  }
  register(
    email: string,
    password: string,
    confirmPassword: string,
    setError: (errorText: string) => void
  ) {
    if (!email || !password || !confirmPassword) {
      setError('Please fill in all inputs');
    } else if (password !== confirmPassword) {
      setError('Passwords do not match');
    } else {
      this.auth
        .createUserWithEmailAndPassword(email, password)
        .then((res: any) => {
          this.loggedIn = true;
          localStorage.setItem(
            'sessionUser',
            JSON.stringify({
              email: res.user._delegate.email,
              id: res.user._delegate.uid,
            })
          );
          this.location.back();
        })
        .catch((e) => {
          console.log(e.code);
          if (e.code === 'auth/email-already-in-use') {
            setError('Email already in use');
          } else if (e.code === 'auth/weak-password') {
            setError('Password not strong enough');
          }
        });
    }
  }
  logout() {
    this.auth.signOut().then(() => {
      localStorage.removeItem('sessionUser');
      this.loggedIn = false;
      this.route.navigate(['']);
    });
  }
}
