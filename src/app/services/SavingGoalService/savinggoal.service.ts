import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { SavingGoal } from '../../models/SavingGoalModel/savinggoal.model';
import { firstValueFrom } from 'rxjs';

/**
 * Service for managing saving goals.
 * Provides methods for creating, reading, updating, and deleting saving goals.
 */
@Injectable({
  providedIn: 'root',
})
export class SavingGoalService {
  constructor(private db: AngularFireDatabase) {}

  /**
   * Creates a new saving goal.
   * @param savingGoal - The details of the new saving goal.
   */
  async createSavingGoal(savingGoal: SavingGoal) {
    await this.db
      .object(`savingGoals/${savingGoal.savingGoalId}`)
      .set(savingGoal);
  }

  /**
   * Retrieves a saving goal by its ID.
   * @param savingGoalId - The ID of the saving goal to retrieve.
   * @returns The saving goal with the specified ID.
   */
  async getSavingGoal(savingGoalId: string) {
    const savingGoal$ = this.db
      .object(`savingGoals/${savingGoalId}`)
      .valueChanges();
    return firstValueFrom(savingGoal$);
  }

  /**
   * Updates a saving goal.
   * @param savingGoal - The updated details of the saving goal.
   */
  async updateSavingGoal(savingGoal: SavingGoal) {
    await this.db
      .object(`savingGoals/${savingGoal.savingGoalId}`)
      .update(savingGoal);
  }

  /**
   * Deletes a saving goal.
   * @param savingGoalId - The ID of the saving goal to delete.
   */
  async deleteSavingGoal(savingGoalId: string) {
    await this.db.object(`savingGoals/${savingGoalId}`).remove();
  }
}
