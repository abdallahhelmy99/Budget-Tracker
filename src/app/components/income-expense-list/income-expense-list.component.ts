import { Component } from '@angular/core';

@Component({
  selector: 'app-income-expense-list',
  templateUrl: './income-expense-list.component.html',
  styleUrls: ['./income-expense-list.component.css']
})
export class IncomeExpenseListComponent {
  items: { type: string, name: string, amount: number }[] = [];

  addItem(item: { type: string, name: string, amount: number }) {
    this.items.push(item);
  }
}