import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { User } from '../../models/UserModel/user.model';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private auth: AngularFireAuth,
    private db: AngularFireDatabase,
    private router: Router
  ) {}

  getCurrentUserId(): Promise<string | null> {
    const auth = getAuth();
    return new Promise((resolve, reject) => {
      onAuthStateChanged(
        auth,
        (user) => {
          if (user) {
            const uid = user.uid;
            resolve(uid);
          } else {
            resolve(null);
          }
        },
        reject
      );
    });
  }

  async getCurrentUser(): Promise<User | null> {
    const userId = await this.getCurrentUserId();
    if (userId) {
      return (await this.db
        .object(`users/${userId}`)
        .valueChanges()
        .toPromise()) as Promise<User>;
    } else {
      return null;
    }
  }

  async signup(newUser: any) {
    const result = await this.auth.createUserWithEmailAndPassword(
      newUser.email,
      newUser.password
    );
    if (result.user) {
      const user: User = {
        userid: result.user.uid,
        fname: newUser.fname,
        lname: newUser.lname,
        email: newUser.email,
      };
      await this.db.object(`users/${user.userid}`).set(user);
      window.location.href = '/home';
    } else {
      throw new Error('Signup failed');
    }
  }

  async login(email: string, password: string) {
    await this.auth.signInWithEmailAndPassword(email, password);
  }

  async logout() {
    await this.auth.signOut();
  }

  async canActivate(): Promise<boolean> {
    const userIsLoggedIn = await this.getCurrentUserId();
    console.log('User is logged in:', userIsLoggedIn);
    if (!userIsLoggedIn || userIsLoggedIn === null) {
      this.router.navigate(['']);
      return false;
    }
    return true;
  }
}
