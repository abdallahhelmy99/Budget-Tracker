import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Budget } from '../../models/BudgetModel/budget.model';
import { firstValueFrom } from 'rxjs';

/**
 * Service for managing budgets.
 * Provides methods for creating, reading, updating, and deleting budgets.
 */
@Injectable({
  providedIn: 'root',
})
export class BudgetService {
  constructor(private db: AngularFireDatabase) {}

  /**
   * Creates a new budget.
   * @param budget - The details of the new budget.
   */
  async createBudget(budget: Budget) {
    await this.db.object(`budgets/${budget.budgetId}`).set(budget);
  }

  /**
   * Retrieves a budget by its ID.
   * @param budgetId - The ID of the budget to retrieve.
   * @returns The budget with the specified ID.
   */
  async getBudget(budgetId: string) {
    const budget$ = this.db.object(`budgets/${budgetId}`).valueChanges();
    return firstValueFrom(budget$);
  }

  /**
   * Updates a budget.
   * @param budget - The updated details of the budget.
   */
  async updateBudget(budget: Budget) {
    await this.db.object(`budgets/${budget.budgetId}`).update(budget);
  }

  /**
   * Deletes a budget.
   * @param budgetId - The ID of the budget to delete.
   */
  async deleteBudget(budgetId: string) {
    await this.db.object(`budgets/${budgetId}`).remove();
  }
}
