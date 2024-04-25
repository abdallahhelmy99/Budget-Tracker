// add.component.ts
import { Component, Output, EventEmitter } from '@angular/core';
import { FinanceService } from '../finance.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent {
  @Output() newItemEvent = new EventEmitter<{type: string, name: string, amount: number}>();

  type = 'Expense';
  name = '';
  amount = 0;

  constructor(private financeService: FinanceService) { }

  addItem() {
    this.newItemEvent.emit({type: this.type, name: this.name, amount: this.amount});
    this.financeService.updateBalance(this.amount, this.type.toLowerCase());
    this.name = '';
    this.amount = 0;
  }
}