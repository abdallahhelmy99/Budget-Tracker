import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { User } from '../../models/UserModel/user.model';
import { SessionStorageService } from '../SessionStorageService/session.service';
import { UserService } from '../UserService/user.service';
import { BudgetService } from '../BudgetService/budget.service';
import { Budget } from '../../models/BudgetModel/budget.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private auth: AngularFireAuth,
    private sessionService: SessionStorageService,
    private userService: UserService,
    private budgetService: BudgetService
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
        budgetId: result.user.uid,
        name: '',
        amount: 0,
        start_date: '',
        end_date: '',
        remaining_amount: 0,
      };
      await this.userService.createUser(user);
      await this.budgetService.createBudget(budget);
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
