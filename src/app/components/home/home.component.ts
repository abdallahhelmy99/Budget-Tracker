import { Component } from '@angular/core';
import { UserService } from '../../services/UserService/user.service';
import { AuthService } from '../../services/AuthService/auth.service';
import { User } from '../../models/UserModel/user.model';
import { Observable } from 'rxjs';
import { Budget } from '../../models/BudgetModel/budget.model';
import { BudgetService } from '../../services/BudgetService/budget.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  currentUser: User | undefined;
  budgets$: Observable<Budget[]> | undefined;
  selectedBudgetId: string | null = null;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private budgetService: BudgetService
  ) {
    this.budgets$ = this.budgetService.getBudgets();
    this.budgetService.getSelectedBudget().subscribe((budgetId) => {
      this.selectedBudgetId = budgetId;
    });
  }

  ngOnInit(): void {
    let selectedBudget;
    if (typeof localStorage !== 'undefined') {
      selectedBudget = localStorage.getItem('selectedBudget');
    }
    if (selectedBudget) {
      this.budgetService.changeSelectedBudget(selectedBudget);
    }
    this.userService.getUser().subscribe((user) => {
      this.currentUser = user!;
    });
  }

  logout() {
    this.authService.logout();
    window.location.href = '/';
  }

  selectBudget(budgetId: string) {
    this.budgetService.changeSelectedBudget(budgetId);
  }

  changeSelectedBudget(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const value = selectElement.value;
    if (value) {
      this.budgetService.changeSelectedBudget(value);
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('selectedBudget', value);
      }
    }
  }
}
