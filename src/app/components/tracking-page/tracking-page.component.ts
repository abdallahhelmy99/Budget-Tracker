import { Component } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
@Component({
  selector: 'app-tracking-page',
  templateUrl: './tracking-page.component.html',
  styleUrl: './tracking-page.component.css',
})
export class TrackingPageComponent {
  currentUser: any;

  constructor(private firebaseService: FirebaseService) {}

  ngOnInit() {
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
