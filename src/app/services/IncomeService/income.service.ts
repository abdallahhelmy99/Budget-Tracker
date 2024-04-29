import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Income } from '../../models/IncomeModel/income.model';
import { Observable } from 'rxjs';
import { BudgetService } from '../BudgetService/budget.service';
import { SessionStorageService } from '../SessionStorageService/session.service';

/**
 * Service for managing incomes.
 * Provides methods for creating, reading, updating, and deleting incomes.
 */
@Injectable({
  providedIn: 'root',
})
export class IncomeService {
  constructor(
    private db: AngularFireDatabase,
    private budgetService: BudgetService,
    private sessionStorageService: SessionStorageService
  ) {}
  userId = this.sessionStorageService.getUid();
  /**
   * Creates a new income.
   * @param income - The details of the new income.
   */
  async createIncome(income: Income) {
    await this.db
      .object(`incomes/${this.userId}/${income.incomeId}`)
      .set(income);
  }

  /**
   * Retrieves an income by its ID.
   * @param userId - The ID of the income to retrieve.
   * @returns The income with the specified ID.
   */
  getIncomes(): Observable<Income[]> {
    return this.db
      .list<Income>(`incomes/${this.sessionStorageService.getUid()}`)
      .valueChanges();
  }

  /**
   * Updates an income.
   * @param income - The updated details of the income.
   */
  async updateIncome(income: Income) {
    await this.db
      .object(`incomes/${this.userId}/${income.incomeId}`)
      .update(income);
  }

  /**
   * Deletes an income.
   * @param incomeId - The ID of the income to delete.
   */
  async deleteIncome(incomeId: string) {
    await this.db.object(`incomes/${this.userId}/${incomeId}`).remove();
  }
}
