import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { User } from '../../models/UserModel/user.model';
import { SessionStorageService } from '../SessionStorageService/session.service';
import { UserService } from '../UserService/user.service';
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
    private userService: UserService
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
    result.user && this.sessionService.save('uid', result.user.uid);
  }

  async logout() {
    await this.auth.signOut();
    this.sessionService.clear();
  }
}
