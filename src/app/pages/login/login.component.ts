import { Component, ElementRef, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Toast } from 'bootstrap';
import { timeInterval } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [
    './login.component.scss',
    '../../../styles/bootstrap.css',
    '../../../styles/style.css',
    '../../../fonts/css/fontawesome-all.min.css',
  ],
})
export class LoginComponent {
  constructor(
    private auth: AuthService,
    private router: Router,
  ) {}

  user = {
    email: '',
    password: '',
  };

  loginFailed = false;

  login() {
    this.auth
      .login(this.user.email, this.user.password)
      .then((response) => {
        localStorage.setItem('token', response.data.jwt);
        console.log('User profile', response.data.user); // Assuming user information is under 'user' property
        console.log('User token', response.data.jwt); // Assuming the token is under 'jwt' property
        this.router.navigate(['home/about']);
      })
      .catch((error) => {
        console.error(error);
        return false;
      });
  }
}
