import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Expense } from '../../models/ExpenseModel/expense.model';
import { Observable } from 'rxjs';
import { SessionStorageService } from '../SessionStorageService/session.service';

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
    private sessionStorageService: SessionStorageService
  ) {}

  /**
   * Creates a new expense.
   * @param expense - The details of the new expense.
   */
  async createExpense(expense: Expense) {
    await this.db
      .object(
        `expenses/${this.sessionStorageService.getUid()}/${expense.expenseId}`
      )
      .set(expense);
    // TODO: Call UpdateBudgetService here
  }

  /**
   * Retrieves an expense by its ID.
   * @param userID - The ID of the expense to retrieve.
   * @returns The expense with the specified ID.
   */
  getExpenses(): Observable<Expense[]> {
    return this.db
      .list<Expense>(`expenses/${this.sessionStorageService.getUid()}`)
      .valueChanges();
  }

  /**
   * Updates an expense.
   * @param expense - The updated details of the expense.
   */
  async updateExpense(expense: Expense) {
    await this.db
      .object(
        `expenses/${this.sessionStorageService.getUid()}/${expense.expenseId}`
      )
      .update(expense);
  }

  /**
   * Deletes an expense.
   * @param expenseId - The ID of the expense to delete.
   */
  async deleteExpense(expenseId: string) {
    await this.db
      .object(`expenses/${this.sessionStorageService.getUid()}/${expenseId}`)
      .remove();
  }
}
