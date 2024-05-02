import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { SavingGoal } from '../../models/SavingGoalModel/savinggoal.model';
import { Observable, from } from 'rxjs';
import { AuthService } from '../AuthService/auth.service';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SavingGoalService {
  constructor(
    private db: AngularFireDatabase,
    private authService: AuthService
  ) {}

  async createSavingGoal(savingGoal: SavingGoal) {
    const userId = await this.authService.getCurrentUserId();
    await this.db
      .object(`savingGoals/${userId}/${savingGoal.savingGoalId}`)
      .set(savingGoal);
  }

  getSavingGoals(): Observable<SavingGoal[]> {
    return from(this.authService.getCurrentUserId()).pipe(
      switchMap((userId) =>
        this.db.list<SavingGoal>(`savingGoals/${userId}`).valueChanges()
      )
    );
  }

  async updateSavingGoal(savingGoal: SavingGoal) {
    const userId = await this.authService.getCurrentUserId();
    await this.db
      .object(`savingGoals/${userId}/${savingGoal.savingGoalId}`)
      .update(savingGoal);
  }

  async deleteSavingGoal(savingGoalId: string) {
    const userId = await this.authService.getCurrentUserId();
    await this.db.object(`savingGoals/${userId}/${savingGoalId}`).remove();
  }
}
