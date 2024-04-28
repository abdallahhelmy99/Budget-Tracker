import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { map, take } from 'rxjs/operators';
import { User } from '../models/UserModel/user.model';
import { ReplaySubject } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { uid } from 'chart.js/dist/helpers/helpers.core';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  constructor(private db: AngularFireDatabase, private auth: AngularFireAuth) {}

  async signup(newUser: any) {
    const result = await this.auth.createUserWithEmailAndPassword(
      newUser.email,
      newUser.password
    );
    if (result.user) {
      sessionStorage.setItem('userid', result.user.uid);
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
      sessionStorage.setItem('userid', result.user.uid);
    } else {
      throw new Error('Login failed');
    }
  }

  async logout() {
    await this.auth.signOut();
    sessionStorage.removeItem('userid');
  }

  async getUserData() {
    const uid = sessionStorage.getItem('userid');
    if (uid) {
      console.log(
        this.db.object(`users/${uid}`).valueChanges().pipe(take(1)).toPromise()
      );

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
    const userId = sessionStorage.getItem('userid');
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
    const userId = sessionStorage.getItem('userid');
    this.db.object(`users/${userId}`).update({ balance: newBalance });
  }
}
