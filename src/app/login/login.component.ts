// login.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username = '';
  password = '';

  predefinedUsername = 'admin';
  predefinedPassword = 'password';

  login() {
    if (this.username === this.predefinedUsername && this.password === this.predefinedPassword) {
      alert('Login successful');
      window.location.href = '/home';
    } else {
      alert('Invalid username or password');
    }
  }
}