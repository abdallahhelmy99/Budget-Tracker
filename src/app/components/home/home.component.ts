import { Component, OnInit } from '@angular/core';
import { UserDataService } from '../../services/userdata.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  currentUser: any;

  constructor(private userDataService: UserDataService) {}

  ngOnInit() {
    this.userDataService.currentUser.subscribe(
      (user) => {
        this.currentUser = user;
        console.log(this.currentUser);
      },
      (error) => {
        console.error('Error in currentUser Observable:', error);
      }
    );
  }
}
