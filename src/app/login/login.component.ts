import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginEmail: string;
  loginPassword: string;
  registerEmail: string;
  registerPassword: string;
  confirmPassword: string;
  error: string = '';

  constructor(public auth: AngularFireAuth, private authService: AuthService) {}

  ngOnInit(): void {}

  login() {
    this.authService.login(this.loginEmail, this.loginPassword, this.setError);
  }
  register() {
    this.authService.register(
      this.registerEmail,
      this.registerPassword,
      this.confirmPassword,
      this.setError
    );
  }
  setError = (errorText: string): void => {
    this.error = errorText;
  };
}
