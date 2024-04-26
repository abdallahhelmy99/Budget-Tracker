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
    this.firebaseService
      .register(this.name, this.username, this.password)
      .subscribe(() => {
        alert('User registered');
        window.location.href = '/';
      });
  }
}
