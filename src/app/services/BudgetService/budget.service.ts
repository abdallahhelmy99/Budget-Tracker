import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Budget } from '../../models/BudgetModel/budget.model';
import { Observable } from 'rxjs';
import { SessionStorageService } from '../SessionStorageService/session.service';

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
    private sessionStorageService: SessionStorageService
  ) {}

  /**
   * Creates a new budget.
   * @param budget - The details of the new budget.
   */
  async createBudget(budget: Budget) {
    await this.db
      .object(
        `budgets/${this.sessionStorageService.getUid()}/${budget.budgetId}`
      )
      .set(budget);
  }

  /**
   * Retrieves a budget by its ID.
   * @param budgetId - The ID of the budget to retrieve.
   * @returns The budget with the specified ID.
   */
  getBudgets(): Observable<Budget[]> {
    return this.db
      .list<Budget>(`budgets/${this.sessionStorageService.getUid()}`)
      .valueChanges();
  }

  /**
   * Updates a budget.
   * @param budget - The updated details of the budget.
   */
  async updateBudget(budget: Budget) {
    await this.db
      .object(
        `budgets/${this.sessionStorageService.getUid()}/${budget.budgetId}`
      )
      .update(budget);
  }

  /**
   * Deletes a budget.
   * @param budgetId - The ID of the budget to delete.
   */
  async deleteBudget(budgetId: string) {
    await this.db
      .object(`budgets/${this.sessionStorageService.getUid()}/${budgetId}`)
      .remove();
  }
}
