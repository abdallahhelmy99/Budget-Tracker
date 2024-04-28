import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { map, take } from 'rxjs/operators';
import { User } from '../models/UserModel/user.model';
import { ReplaySubject } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  private currentUserSubject = new ReplaySubject<User | null>(1); // Change this line
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(private db: AngularFireDatabase, private auth: AngularFireAuth) {}
  // current user

  async signup(email: string, password: string) {
    const result = await this.auth.createUserWithEmailAndPassword(
      email,
      password
    );
    const user = result.user;
    if (user) {
      const newUser: User = {
        userid: user.uid, // Fix: Change type from number to string
        email,
        name: '', // default value
        password, // from signup form
        balance: 0, // default value
      };
      this.currentUserSubject.next(newUser);
      return newUser;
    } else {
      throw new Error('Signup failed');
    }
  }

  async login(email: string, password: string) {
    const result = await this.auth.signInWithEmailAndPassword(email, password);
    const user = result.user;
    if (user) {
      sessionStorage.setItem('userid', user.uid);
      return true;
    } else {
      throw new Error('Login failed');
    }
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
