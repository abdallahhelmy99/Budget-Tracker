import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { User } from '../../models/UserModel/user.model';
import { SessionStorageService } from '../SessionStorageService/session.service';
import { UserService } from '../UserService/user.service';
import { BudgetService } from '../BudgetService/budget.service';
import { Budget } from '../../models/BudgetModel/budget.model';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private auth: AngularFireAuth,
    private db: AngularFireDatabase,
    private sessionService: SessionStorageService,
    private userService: UserService,
    private budgetService: BudgetService
  ) {}

  /**
   * This asynchronous function is used to sign up a new user.
   *
   * @param {any} newUser - An object containing the new user's information.
   *
   * The newUser object should have the following properties:
   * - email: The user's email address.
   * - password: The user's password.
   * - fname: The user's first name.
   * - lname: The user's last name.
   *
   * The function uses Firebase's createUserWithEmailAndPassword method to create a new user.
   * If the user is successfully created, their uid is saved in the session storage.
   *
   * A new User object is then created with the user's uid, first name, last name, and email.
   *
   * A new Budget object is also created with a unique budgetId, a name of 'Budget', and initial values of 0 for amount, remaining_amount, and empty strings for start_date and end_date.
   *
   * The User object is saved in the database using the UserService's createUser method.
   * The Budget object is saved in the database under the path `budgets/{user's uid}/{budget's id}`.
   *
   * If the user creation is successful, the user is redirected to the home page.
   * If the user creation fails, an error is thrown.
   *
   * @returns {Promise<void>} Returns a promise that resolves to void.
   *
   * @throws {Error} Throws an error if the signup process fails.
   */
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
        lname: newUser.lname,
        email: newUser.email,
      };

      const budget: Budget = {
        budgetId: this.db.database.ref('budgets').push().key!,
        name: 'Budget',
        amount: 0,
        start_date: '',
        end_date: '',
        remaining_amount: 0,
      };
      await this.userService.createUser(user);
      await this.db
        .object(`budgets/${result.user.uid}/${budget.budgetId}`)
        .set(budget);
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
