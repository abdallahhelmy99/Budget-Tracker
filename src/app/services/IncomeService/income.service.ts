import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Income } from '../../models/IncomeModel/income.model';
import { firstValueFrom } from 'rxjs';

/**
 * Service for managing incomes.
 * Provides methods for creating, reading, updating, and deleting incomes.
 */
@Injectable({
  providedIn: 'root',
})
export class IncomeService {
  constructor(private db: AngularFireDatabase) {}

  /**
   * Creates a new income.
   * @param income - The details of the new income.
   */
  async createIncome(income: Income) {
    await this.db.object(`incomes/${income.incomeId}`).set(income);
  }

  /**
   * Retrieves an income by its ID.
   * @param incomeId - The ID of the income to retrieve.
   * @returns The income with the specified ID.
   */
  async getIncome(userId: string) {
    const incomes$ = this.db
      .list(`incomes`, (ref) => ref.orderByChild('userId').equalTo(userId))
      .valueChanges();
    return firstValueFrom(incomes$);
  }

  /**
   * Updates an income.
   * @param income - The updated details of the income.
   */
  async updateIncome(income: Income) {
    await this.db.object(`incomes/${income.incomeId}`).update(income);
  }

  /**
   * Deletes an income.
   * @param incomeId - The ID of the income to delete.
   */
  async deleteIncome(incomeId: string) {
    await this.db.object(`incomes/${incomeId}`).remove();
  }
}
