// add.component.ts
import { Component, Output, EventEmitter } from '@angular/core';
import { ExpenseService } from '../../services/ExpenseService/expense.service';
import { IncomeService } from '../../services/IncomeService/income.service';
import { Expense } from '../../models/ExpenseModel/expense.model';
import { Income } from '../../models/IncomeModel/income.model';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { BudgetService } from '../../services/BudgetService/budget.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
})
export class AddComponent {
  @Output() newItemEvent = new EventEmitter<{
    type: string;
    name: string;
    amount: number;
  }>();

  id = '';
  type = 'Expense';
  name = '';
  amount = 0;
  date = '';

  constructor(
    private expenseService: ExpenseService,
    private incomeService: IncomeService,
    private budgetService: BudgetService,
    private db: AngularFireDatabase
  ) {}

  async addItem() {
    if (this.type.toLowerCase() === 'expense') {
      const expenseId = this.db.database.ref('expenses').push().key;
      const expense: Expense = {
        expenseId: expenseId!,
        amount: this.amount,
        date: this.date,
        name: this.name,
      };
      await this.expenseService.createExpense(expense);
      await this.budgetService.updateBudgetAmount(-this.amount); // subtract expense from budget
    } else if (this.type.toLowerCase() === 'income') {
      const incomeId = this.db.database.ref('incomes').push().key;
      const income: Income = {
        incomeId: incomeId!,
        amount: this.amount,
        name: this.name,
        date: this.date,
      };
      await this.incomeService.createIncome(income);
      await this.budgetService.updateBudgetAmount(this.amount); // add income to budget
    }

    this.newItemEvent.emit({
      type: this.type,
      name: this.name,
      amount: this.amount,
    });

    this.name = '';
    this.amount = 0;
  }
}
