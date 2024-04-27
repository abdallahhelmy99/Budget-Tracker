import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  currentUser: any;

  constructor(private firebaseService: FirebaseService) {}

  ngOnInit() {
    if (sessionStorage) {
      const userId = sessionStorage.getItem('userid');
      if (userId) {
        this.firebaseService.getUserById(+userId).subscribe(
          (user) => {
            this.currentUser = user;
          },
          (error) => {
            console.error('Error in getting user:', error);
          }
        );
      }
    }
  }
}
