// register.component.ts
import { Component } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  name = '';
  username = '';
  password = '';

  constructor(private firebaseService: FirebaseService) {}

  ngOnInit() {}

  register() {
    this.firebaseService.signup(this.username, this.password).then(
      (user) => {
        console.log('User registered:', user);
      },
      (error) => {
        console.error('Error in registration:', error);
      }
    );
  }
}
