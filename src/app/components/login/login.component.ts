// login.component.ts
import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  username = '';
  password = '';

  constructor(private firebaseService: FirebaseService) {}

  ngOnInit() {}

  login() {
    this.firebaseService.login(this.username, this.password).subscribe(
      (user: any) => {
        if (user) {
          alert('Login successful');
          window.location.href = '/home';
        } else {
          alert('Login failed');
        }
      },
      (error) => {
        alert('Login failed');
      }
    );
  }
}
