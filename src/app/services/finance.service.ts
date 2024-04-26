// finance.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FinanceService {
  private balance = new BehaviorSubject(0);

  currentBalance = this.balance.asObservable();

  constructor() { }

  updateBalance(amount: number, type: string) {
    let currentBalance = this.balance.value;
    currentBalance = type === 'income' ? currentBalance + amount : currentBalance - amount;
    this.balance.next(currentBalance);
  }
}