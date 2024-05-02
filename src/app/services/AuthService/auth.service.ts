import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { User } from '../../models/UserModel/user.model';
import { Budget } from '../../models/BudgetModel/budget.model';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private auth: AngularFireAuth, private db: AngularFireDatabase) {}

  getCurrentUserId(): Promise<string | null> {
    const auth = getAuth();
    return new Promise((resolve, reject) => {
      onAuthStateChanged(
        auth,
        (user) => {
          if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/auth.user
            const uid = user.uid;
            resolve(uid);
          } else {
            // User is signed out
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
      const budget: Budget = {
        budgetId: this.db.database.ref('budgets').push().key!,
        name: 'Budget',
        amount: 0,
        start_date: '',
        end_date: '',
        remaining_amount: 0,
      };

      await this.db
        .object(`budgets/${result.user.uid}/${budget.budgetId}`)
        .set(budget);
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
}
