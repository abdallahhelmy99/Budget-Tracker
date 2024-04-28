import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../../services/UserService/user.service';
import { AuthService } from '../../services/AuthService/auth.service';
import { SessionStorageService } from '../../services/SessionStorageService/session.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  currentUser: any;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private sessionStorageService: SessionStorageService
  ) {}

  ngOnInit() {
    const userid = this.sessionStorageService.getUid();
    this.userService.getUser(userid!).then((user) => {
      this.currentUser = user;
    });
  }

  logout() {
    this.authService.logout();
    window.location.href = '/';
  }
}
