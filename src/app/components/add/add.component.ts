// add.component.ts
import { Component, Output, EventEmitter } from '@angular/core';

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

  type = 'Expense';
  name = '';
  amount = 0;

  // addItem() {
  //   this.newItemEvent.emit({
  //     type: this.type,
  //     name: this.name,
  //     amount: this.amount,
  //   });
  //   this.financeService.updateBalance(this.amount, this.type.toLowerCase());
  //   this.name = '';
  //   this.amount = 0;
  // }
}
