import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-tracking-page',
  templateUrl: './tracking-page.component.html',
  styleUrl: './tracking-page.component.css',
})
export class TrackingPageComponent {
  currentUser: any;
  @Output() newItemEvent = new EventEmitter<{
    type: string;
    name: string;
    amount: number;
  }>();

  type = 'Expense';
  name = '';
  amount = 0;

  constructor(private firebaseService: FirebaseService) {}

  ngOnInit() {
    this.firebaseService.getUserData().then((user) => {
      this.currentUser = user;
    });
  }

  async addItem() {
    const newItem = {
      type: this.type,
      name: this.name,
      amount: this.amount,
    };

    this.newItemEvent.emit(newItem);

    // Get the current balance from the firebaseService
    const currentBalance = await this.firebaseService.getUserBalance();

    // Calculate the new balance based on the type of the item
    const newBalance =
      this.type.toLowerCase() === 'expense'
        ? currentBalance - this.amount
        : currentBalance + this.amount;

    // Update the balance in Firebase
    await this.firebaseService.updateUserBalance(newBalance);

    this.name = '';
    this.amount = 0;
  }
}
