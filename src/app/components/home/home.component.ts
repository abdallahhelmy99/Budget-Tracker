import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { FirebaseService } from '../../services/firebase.service';
import { User } from '../../models/UserModel/user.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  currentUser: any;

  constructor(private firebaseService: FirebaseService) {}

  ngOnInit() {
    this.firebaseService.getUserData().then((user) => {
      this.currentUser = user;
    });
  }
}
