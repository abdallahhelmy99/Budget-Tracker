import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Expense } from '../../models/ExpenseModel/expense.model';
import { Observable, from, switchMap, tap } from 'rxjs';
import { AuthService } from '../AuthService/auth.service';
import { BudgetService } from '../BudgetService/budget.service';

/**
 * Service for managing expenses.
 * Provides methods for creating, reading, updating, and deleting expenses.
 */
@Injectable({
  providedIn: 'root',
})
export class ExpenseService {
  constructor(
    private db: AngularFireDatabase,
    private authService: AuthService,
    private budgetService: BudgetService
  ) {}

  selectedBudgetId: string = '';

  /**
   * Creates a new expense.
   * @param expense - The details of the new expense.
   */
  async createExpense(expense: Expense) {
    const userId = await this.authService.getCurrentUserId();
    expense.budgetId = this.budgetService.selectedBudgetId.getValue();
    await this.db
      .object(`expenses/${userId}/${expense.expenseId}`)
      .set(expense);
  }

  getExpenses(): Observable<Expense[]> {
    return from(this.authService.getCurrentUserId()).pipe(
      tap((userId) => console.log('User ID:', userId)),
      switchMap((userId) =>
        this.budgetService
          .getSelectedBudget()
          .pipe(
            switchMap((selectedBudget) =>
              this.db
                .list<Expense>(`expenses/${userId}`, (ref) =>
                  ref.orderByChild('budgetId').equalTo(selectedBudget)
                )
                .valueChanges()
            )
          )
      )
    );
  }

  async updateExpense(expense: Expense) {
    const userId = await this.authService.getCurrentUserId();
    expense.budgetId = this.selectedBudgetId;
    await this.db
      .object(`expenses/${userId}/${expense.expenseId}`)
      .update(expense);
  }

  async deleteExpense(expenseId: string) {
    const userId = await this.authService.getCurrentUserId();
    await this.db.object(`expenses/${userId}/${expenseId}`).remove();
  }
}
