import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { map, take } from 'rxjs/operators';
import { User } from '../models/UserModel/user.model';
import { ReplaySubject } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  constructor(
    private db: AngularFireDatabase,
    private auth: AngularFireAuth,
    private sessionService: SessionService
  ) {}

  async signup(newUser: any) {
    const result = await this.auth.createUserWithEmailAndPassword(
      newUser.email,
      newUser.password
    );
    if (result.user) {
      this.sessionService.save(result.user.uid);
      const user: User = {
        email: newUser.email,
        balance: 0,
        userid: result.user.uid,
        fname: newUser.fname,
        lname: newUser.fname,
      };
      await this.db.object(`users/${result.user.uid}`).set(user);
      window.location.href = '/home';
    } else {
      throw new Error('Signup failed');
    }
  }

  async login(email: string, password: string) {
    const result = await this.auth.signInWithEmailAndPassword(email, password);
    if (result.user) {
      this.sessionService.save(result.user.uid);
    } else {
      throw new Error('Login failed');
    }
  }

  async logout() {
    await this.auth.signOut();
    this.sessionService.clear();
  }

  async getUserData() {
    const uid = this.sessionService.get();

    if (uid) {
      return this.db
        .object(`users/${uid}`)
        .valueChanges()
        .pipe(take(1))
        .toPromise();
    } else {
      throw new Error('No user ID found in session storage');
    }
  }

  async getUserBalance(): Promise<number> {
    const userId = this.sessionService.get();
    if (userId) {
      const user = await this.db
        .object(`users/${userId}`)
        .valueChanges()
        .pipe(
          map((user: any) => {
            return user.balance;
          })
        )
        .toPromise();

      return user.balance;
    } else {
      throw new Error('No user ID found in session storage');
    }
  }

  async updateUserBalance(newBalance: number) {
    const userId = this.sessionService.get();
    this.db.object(`users/${userId}`).update({ balance: newBalance });
  }
}
