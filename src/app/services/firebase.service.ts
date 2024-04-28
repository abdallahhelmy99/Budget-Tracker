import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { map, take } from 'rxjs/operators';
import { User } from '../models/UserModel/user.model';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { SessionService } from './session.service';
import { firstValueFrom } from 'rxjs';

/**
 * Service for interacting with Firebase.
 * Provides methods for user authentication and user data management.
 */
@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  constructor(
    private db: AngularFireDatabase,
    private auth: AngularFireAuth,
    private sessionService: SessionService
  ) {}

  /**
   * Signs up a new user with the provided details.
   * @param newUser - The details of the new user.
   * @throws {Error} If the signup process fails.
   */
  async signup(newUser: any) {
    const result = await this.auth.createUserWithEmailAndPassword(
      newUser.email,
      newUser.password
    );
    if (result.user) {
      this.sessionService.save('uid', result.user.uid);
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

  /**
   * Logs in a user with the provided email and password.
   * @param email - The email of the user.
   * @param password - The password of the user.
   * @throws {Error} If the login process fails.
   */
  async login(email: string, password: string) {
    const result = await this.auth.signInWithEmailAndPassword(email, password);
    if (result.user) {
      this.sessionService.save('uid', result.user.uid);
    } else {
      throw new Error('Login failed');
    }
  }

  /**
   * Logs out the current user.
   */
  async logout() {
    await this.auth.signOut();
    this.sessionService.clear();
  }

  /**
   * Retrieves the data of the current user.
   * @returns The data of the current user.
   * @throws {Error} If no user ID is found in session storage.
   */
  async getUserData() {
    const uid = this.sessionService.get('uid');
    if (uid) {
      const user$ = this.db.object(`users/${uid}`).valueChanges().pipe(take(1));
      return firstValueFrom(user$);
    } else {
      throw new Error('No user ID found in session storage');
    }
  }

  /**
   * Retrieves the balance of the current user.
   * @returns The balance of the current user.
   * @throws {Error} If no user ID is found in session storage.
   */
  async getUserBalance(): Promise<number> {
    const userId = this.sessionService.get('uid');
    if (userId) {
      const user$ = this.db
        .object(`users/${userId}`)
        .valueChanges()
        .pipe(
          map((user: any) => user.balance),
          take(1)
        );
      return firstValueFrom(user$);
    } else {
      throw new Error('No user ID found in session storage');
    }
  }

  /**
   * Updates the balance of the current user.
   * @param newBalance - The new balance of the user.
   */
  async updateUserBalance(newBalance: number) {
    const userId = this.sessionService.get('uid');
    if (userId) {
      this.db.object(`users/${userId}`).update({ balance: newBalance });
    } else {
      throw new Error('No user ID found in session storage');
    }
  }
}
