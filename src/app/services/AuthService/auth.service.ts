import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { User } from '../../models/UserModel/user.model';
import { SessionService } from '../SessionStorageService/session.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private auth: AngularFireAuth,
    private sessionService: SessionService
  ) {}

  async signup(newUser: any) {
    const result = await this.auth.createUserWithEmailAndPassword(
      newUser.email,
      newUser.password
    );
    if (result.user) {
      this.sessionService.save('uid', result.user.uid);
      const user: User = {
        userid: result.user.uid,
        fname: newUser.fname,
        lname: newUser.fname,
        email: newUser.email,
      };
      window.location.href = '/home';
    } else {
      throw new Error('Signup failed');
    }
  }

  async login(email: string, password: string) {
    const result = await this.auth.signInWithEmailAndPassword(email, password);
    if (result.user) {
      this.sessionService.save('uid', result.user.uid);
    } else {
      throw new Error('Login failed');
    }
  }

  async logout() {
    await this.auth.signOut();
    this.sessionService.clear();
  }
}
