import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../../services/UserService/user.service';
import { AuthService } from '../../services/AuthService/auth.service';
import { SessionStorageService } from '../../services/SessionStorageService/session.service';
import { User } from '../../models/UserModel/user.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  currentUser: User | undefined;

  constructor(
    private userService: UserService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.userService.getUser().subscribe((user) => {
      this.currentUser = user!;
    });
  }

  logout() {
    this.authService.logout();
    window.location.href = '/';
  }
}
