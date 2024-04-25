// balance.component.ts
import { Component, OnInit } from '@angular/core';
import { FinanceService } from '../finance.service';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.css']
})
export class BalanceComponent implements OnInit {
  balance: number = 0; // Initialize balance to 0

  constructor(private financeService: FinanceService) { }

  ngOnInit() {
    this.financeService.currentBalance.subscribe(balance => {
      if (balance !== null) { // Check if balance is not null
        this.balance = balance;
      }
    });
  }
}