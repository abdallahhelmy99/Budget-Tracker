import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Budget } from '../../models/BudgetModel/budget.model';
import { Observable, take, from, BehaviorSubject } from 'rxjs';
import { AuthService } from '../AuthService/auth.service';
import { map, switchMap, tap } from 'rxjs/operators';

/**
 * Service for managing budgets.
 * Provides methods for creating, reading, updating, and deleting budgets.
 */
@Injectable({
  providedIn: 'root',
})
export class BudgetService {
  constructor(
    private db: AngularFireDatabase,
    private authService: AuthService
  ) {}

  selectedBudgetId: BehaviorSubject<string> = new BehaviorSubject<string>('');

  /**
   * Creates a new budget.
   * @param budget - The details of the new budget.
   */
  async createBudget(budget: Budget) {
    const userId = await this.authService.getCurrentUserId();
    await this.db.object(`budgets/${userId}/${budget.budgetId}`).set(budget);
  }

  /**
   * Retrieves a budget by its ID.
   * @param budgetId - The ID of the budget to retrieve.
   * @returns The budget with the specified ID.
   */

  getBudgets(): Observable<Budget[]> {
    return from(this.authService.getCurrentUserId()).pipe(
      switchMap((userId) =>
        this.db.list<Budget>(`budgets/${userId}`).valueChanges()
      ),
      tap((budgets) => {
        if (budgets.length > 0 && !this.selectedBudgetId.getValue()) {
          this.selectedBudgetId.next(budgets[0].budgetId);
        }
      })
    );
  }

  /**
   * Updates a budget.
   * @param budget - The updated details of the budget.
   */
  async updateBudget(budget: Budget) {
    const userId = await this.authService.getCurrentUserId();
    await this.db.object(`budgets/${userId}/${budget.budgetId}`).update(budget);
  }

  async updateBudgetAmount(amount: number) {
    const userId = await this.authService.getCurrentUserId();
    const budgets = await this.db
      .list<Budget>(`budgets/${userId}`)
      .valueChanges()
      .pipe(take(1))
      .toPromise();
    const budget = budgets![0];
    budget.amount += amount;
    await this.updateBudget(budget);
  }

  changeSelectedBudget(budgetId: string) {
    this.selectedBudgetId.next(budgetId);
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('selectedBudget', budgetId);
    }
    console.log(
      'Selected budget ID updated:',
      this.selectedBudgetId.getValue()
    );
  }

  getSelectedBudget(): Observable<string> {
    return this.selectedBudgetId.asObservable();
  }

  /**
   * Deletes a budget.
   * @param budgetId - The ID of the budget to delete.
   */
  async deleteBudget(budgetId: string) {
    const userId = await this.authService.getCurrentUserId();

    // Delete the budget
    await this.db.object(`budgets/${userId}/${budgetId}`).remove();

    // Get the list of incomes and expenses associated with the budgetId and delete them
    const incomes = this.db.list(`incomes/${userId}`, (ref) =>
      ref.orderByChild('budgetId').equalTo(budgetId)
    );
    incomes
      .snapshotChanges()
      .pipe(
        take(1), // Take the first (and only) snapshot
        map(
          (changes) => changes.map((c) => c.key) // Extract the keys of the incomes
        )
      )
      .subscribe((keys) => {
        keys.forEach((key) => {
          this.db.object(`incomes/${userId}/${key}`).remove(); // Delete each income
        });
      });

    const expenses = this.db.list(`expenses/${userId}`, (ref) =>
      ref.orderByChild('budgetId').equalTo(budgetId)
    );
    expenses
      .snapshotChanges()
      .pipe(
        take(1), // Take the first (and only) snapshot
        map(
          (changes) => changes.map((c) => c.key) // Extract the keys of the expenses
        )
      )
      .subscribe((keys) => {
        keys.forEach((key) => {
          this.db.object(`expenses/${userId}/${key}`).remove(); // Delete each expense
        });
      });
  }
}
