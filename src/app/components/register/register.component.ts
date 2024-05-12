import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/AuthService/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup | any;

  constructor(
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.registerForm = new FormGroup({
      uid: new FormControl(''),
      fname: new FormControl('', Validators.required),
      lname: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  register() {
    if (this.registerForm.valid) {
      this.authService.signup(this.registerForm.value).then(
        (user) => {
          console.log('User registered:', user);
          this.snackBar.open('Registration successful', 'Close', {
            duration: 3000,
          });
        },
        (error) => {
          console.error('Error in registration:', error);
          this.snackBar.open(
            'Error in registration: ' + error.message,
            'Close',
            {
              duration: 3000,
            }
          );
        }
      );
    } else {
      console.error('Form is not valid');
      this.snackBar.open('Form is not valid', 'Close', {
        duration: 3000,
      });
    }
  }
}
