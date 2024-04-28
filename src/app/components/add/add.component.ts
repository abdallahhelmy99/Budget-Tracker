// add.component.ts
import { Component, Output, EventEmitter } from '@angular/core';
import { ExpenseService } from '../../services/ExpenseService/expense.service';
import { IncomeService } from '../../services/IncomeService/income.service';
import { Expense } from '../../models/ExpenseModel/expense.model';
import { Income } from '../../models/IncomeModel/income.model';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { SessionStorageService } from '../../services/SessionStorageService/session.service';

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
  date = new Date().toISOString();
  description = '';
  source = '';

  constructor(
    private expenseService: ExpenseService,
    private incomeService: IncomeService,
    private db: AngularFireDatabase,
    private sessionstorageService: SessionStorageService
  ) {}

  async addItem() {
    const categoryId = this.db.database.ref('categories').push().key;

    if (this.type.toLowerCase() === 'expense') {
      const expense: Expense = {
        expenseId: this.sessionstorageService.getUid()!, // Replace with actual ID generation logic
        amount: this.amount,
        category_id: categoryId?.toString() ?? '',
        date: new Date().toISOString(), // Consider using a Date type if supported by Firebase
        description: this.description,
      };
      await this.expenseService.createExpense(expense);
    } else if (this.type.toLowerCase() === 'income') {
      const income: Income = {
        incomeId: this.sessionstorageService.getUid()!, // Replace with actual ID generation logic
        amount: this.amount,
        source: this.source,
        date: new Date().toISOString(), // Consider using a Date type if supported by Firebase
        description: this.description,
      };
      await this.incomeService.createIncome(income);
    }

    this.newItemEvent.emit({
      type: this.type,
      name: this.name,
      amount: this.amount,
    });

    this.name = '';
    this.amount = 0;
    this.description = '';
    this.source = '';
  }
}
