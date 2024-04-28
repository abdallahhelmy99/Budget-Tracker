import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Expense } from '../../models/ExpenseModel/expense.model';
import { firstValueFrom } from 'rxjs';

/**
 * Service for managing expenses.
 * Provides methods for creating, reading, updating, and deleting expenses.
 */
@Injectable({
  providedIn: 'root',
})
export class ExpenseService {
  constructor(private db: AngularFireDatabase) {}

  /**
   * Creates a new expense.
   * @param expense - The details of the new expense.
   */
  async createExpense(expense: Expense) {
    await this.db.object(`expenses/${expense.expenseId}`).set(expense);
  }

  /**
   * Retrieves an expense by its ID.
   * @param expenseId - The ID of the expense to retrieve.
   * @returns The expense with the specified ID.
   */
  async getExpense(userId: string) {
    const expenses$ = this.db
      .list(`expenses`, (ref) => ref.orderByChild('userId').equalTo(userId))
      .valueChanges();
    return firstValueFrom(expenses$);
  }

  /**
   * Updates an expense.
   * @param expense - The updated details of the expense.
   */
  async updateExpense(expense: Expense) {
    await this.db.object(`expenses/${expense.expenseId}`).update(expense);
  }

  /**
   * Deletes an expense.
   * @param expenseId - The ID of the expense to delete.
   */
  async deleteExpense(expenseId: string) {
    await this.db.object(`expenses/${expenseId}`).remove();
  }
}
