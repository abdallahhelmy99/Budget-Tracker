import { Component, Input, Output, EventEmitter } from '@angular/core';
import { UserService } from '../../services/UserService/user.service';
import { SessionStorageService } from '../../services/SessionStorageService/session.service';

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

  constructor(
    private userService: UserService,
    private sessionstorageService: SessionStorageService
  ) {}

  ngOnInit() {
    const userid = this.sessionstorageService.get('uid');
    this.userService.getUser(userid!).then((user) => {
      this.currentUser = user;
    });
  }

  // async addItem() {
  //   const newItem = {
  //     type: this.type,
  //     name: this.name,
  //     amount: this.amount,
  //   };

  //   this.newItemEvent.emit(newItem);

  //   try {
  //     // Get the current balance from the authService
  //     const currentBalance = await this.authService.getUserBalance();

  //     // Calculate the new balance based on the type of the item
  //     const newBalance =
  //       this.type.toLowerCase() === 'expense'
  //         ? currentBalance - this.amount
  //         : currentBalance + this.amount;

  //     // Update the balance in Firebase
  //     await this.authService.updateUserBalance(newBalance);

  //     this.name = '';
  //     this.amount = 0;
  //   } catch (error) {
  //     console.error('Failed to update balance:', error);
  //   }
}
