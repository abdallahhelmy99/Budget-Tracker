// income-expense-list.component.ts
import { Component, OnInit } from '@angular/core';
import { SessionStorageService } from '../../services/SessionStorageService/session.service';
import { ExpenseService } from '../../services/ExpenseService/expense.service';
import { IncomeService } from '../../services/IncomeService/income.service';
import { Expense } from '../../models/ExpenseModel/expense.model';
import { Income } from '../../models/IncomeModel/income.model';

@Component({
  selector: 'app-income-expense-list',
  templateUrl: './income-expense-list.component.html',
  styleUrls: ['./income-expense-list.component.css'],
})
export class IncomeExpenseListComponent implements OnInit {
  items: { type: string; name: string; amount: number }[] = [];
  expenses: Expense[] = [];
  incomes: Income[] = [];

  constructor(
    private expenseService: ExpenseService,
    private incomeService: IncomeService
  ) {}

  ngOnInit(): void {
    this.expenseService.getExpenses().subscribe((expenses) => {
      this.expenses = expenses;
    });

    this.incomeService.getIncomes().subscribe((incomes) => {
      this.incomes = incomes;
    });
  }

  addItem(item: { type: string; name: string; amount: number }) {
    this.items.push(item);
  }

  deleteIncome(incomeId: string) {
    this.incomeService.deleteIncome(incomeId);
  }

  deleteExpense(expenseId: string) {
    this.expenseService.deleteExpense(expenseId);
  }
}
