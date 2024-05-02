import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Income } from '../../models/IncomeModel/income.model';
import { Observable, from, switchMap, tap } from 'rxjs';
import { AuthService } from '../AuthService/auth.service';
import { BudgetService } from '../BudgetService/budget.service';

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
    private authService: AuthService,
    private budgetService: BudgetService
  ) {}

  selectedBudgetId: string = '';

  async createIncome(income: Income) {
    const userId = await this.authService.getCurrentUserId();
    income.budgetId = this.budgetService.selectedBudgetId.getValue();
    await this.db.object(`incomes/${userId}/${income.incomeId}`).set(income);
  }

  getIncomes(): Observable<Income[]> {
    return from(this.authService.getCurrentUserId()).pipe(
      tap((userId) => console.log('User ID:', userId)),
      switchMap((userId) =>
        this.budgetService
          .getSelectedBudget()
          .pipe(
            switchMap((selectedBudget) =>
              this.db
                .list<Income>(`incomes/${userId}`, (ref) =>
                  ref.orderByChild('budgetId').equalTo(selectedBudget)
                )
                .valueChanges()
            )
          )
      )
    );
  }

  async updateIncome(income: Income) {
    const userId = await this.authService.getCurrentUserId();
    income.budgetId = this.selectedBudgetId;
    await this.db.object(`incomes/${userId}/${income.incomeId}`).update(income);
  }

  async deleteIncome(incomeId: string) {
    const userId = await this.authService.getCurrentUserId();
    await this.db.object(`incomes/${userId}/${incomeId}`).remove();
  }
}
