import { Component, OnInit } from '@angular/core';
import { BudgetService } from '../services/BudgetService/budget.service';
import { Budget } from '../models/BudgetModel/budget.model';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Component({
  selector: 'app-budget-management',
  templateUrl: './budget-management.component.html',
  styleUrls: ['./budget-management.component.css'],
})
export class BudgetManagementComponent implements OnInit {
  budgets: Budget[] = [];
  newBudget: Budget = {
    amount: 0,
    budgetId: '',
    name: '',
    start_date: '',
    end_date: '',
    remaining_amount: 0,
  };
  editingBudgetId: string | null = null;

  constructor(
    private budgetService: BudgetService,
    private db: AngularFireDatabase
  ) {}

  ngOnInit() {
    this.budgetService.getBudgets().subscribe((budgets) => {
      this.budgets = budgets;
    });
  }

  createBudget() {
    if (this.newBudget.name && this.newBudget.amount) {
      this.newBudget.budgetId = this.generateId(); // replace with your ID generation logic
      this.budgetService.createBudget(this.newBudget);
      this.newBudget = {
        budgetId: '',
        name: '',
        amount: 0,
        start_date: '',
        end_date: '',
        remaining_amount: 0,
      };
    }
  }

  editBudget(budget: Budget) {
    this.newBudget = { ...budget };
    this.editingBudgetId = budget.budgetId;
  }

  saveBudget() {
    if (this.newBudget.name && this.newBudget.amount) {
      if (this.editingBudgetId) {
        this.budgetService.updateBudget(this.newBudget);
      } else {
        this.newBudget.budgetId = this.generateId(); // replace with your ID generation logic
        this.budgetService.createBudget(this.newBudget);
      }
      this.newBudget = {
        budgetId: '',
        name: '',
        amount: 0,
        start_date: '',
        end_date: '',
        remaining_amount: 0,
      };
      this.editingBudgetId = null;
    }
  }

  generateId(): string {
    return this.db.database.ref('budgets').push().key!;
  }

  deleteBudget(budgetId: string) {
    this.budgetService.deleteBudget(budgetId);
  }
}
