// login.component.ts
import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  username = '';
  password = '';

  constructor(
    private router: Router,
    private snackBar: MatSnackBar,
    private firebaseService: FirebaseService
  ) {}

  ngOnInit() {}

  async login() {
    try {
      await this.firebaseService.login(this.username, this.password);
      this.snackBar.open('Login successful', 'Close', { duration: 3000 });
      this.router.navigate(['/home']);
    } catch (error) {
      this.snackBar.open('Invalid username or password', 'Close', {
        duration: 3000,
      });
    }
  }
}
