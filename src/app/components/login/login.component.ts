// login.component.ts
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/AuthService/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({});

  constructor(
    private router: Router,
    private snackBar: MatSnackBar,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  async login() {
    if (this.loginForm.valid) {
      try {
        await this.authService.login(
          this.loginForm.value.email,
          this.loginForm.value.password
        );
        this.snackBar.open('Login Successful', 'Close', { duration: 3000 });
        this.router.navigate(['/home']);
      } catch (error) {
        this.snackBar.open('Incorrect Email or Password', 'Close', {
          duration: 3000,
        });
      }
    } else {
      this.snackBar.open('Invalid Email or Password', 'Close', {
        duration: 3000,
      });
    }
  }
}
