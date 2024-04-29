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
    private incomeService: IncomeService,
    private sessionstorageService: SessionStorageService
  ) {}
  ngOnInit(): void {
    const userId = this.sessionstorageService.getUid();
    this.getExpenses(userId!);
    this.getIncomes(userId!);
    console.log(this.expenses);
    console.log(this.incomes);
  }

  async getExpenses(userId: string) {
    this.expenses = (await this.expenseService.getExpense(userId)) as Expense[];
  }

  async getIncomes(userId: string) {
    this.incomes = (await this.incomeService.getIncome(userId)) as Income[];
  }

  addItem(item: { type: string; name: string; amount: number }) {
    this.items.push(item);
  }
}
