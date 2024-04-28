// register.component.ts
import { Component } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { uid } from 'chart.js/dist/helpers/helpers.core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  newUser = {
    uid: '',
    fname: '',
    lname: '',
    email: '',
    password: '',
  };

  constructor(private firebaseService: FirebaseService) {}

  ngOnInit() {}

  register() {
    this.firebaseService.signup(this.newUser).then(
      (user) => {
        console.log('User registered:', user);
      },
      (error) => {
        console.error('Error in registration:', error);
      }
    );
  }
}
