// login.component.ts
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/AuthService/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  email = '';
  password = '';

  constructor(
    private router: Router,
    private snackBar: MatSnackBar,
    private authService: AuthService
  ) {}

  ngOnInit() {}

  async login() {
    try {
      await this.authService.login(this.email, this.password);
      this.snackBar.open('Login successful', 'Close', { duration: 3000 });
      this.router.navigate(['/home']);
    } catch (error) {
      this.snackBar.open('Invalid username or password', 'Close', {
        duration: 3000,
      });
    }
  }
}
