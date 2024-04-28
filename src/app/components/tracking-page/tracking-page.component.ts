// tracking-page.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { UserService } from '../../services/UserService/user.service';
import { SessionStorageService } from '../../services/SessionStorageService/session.service';
import { BudgetService } from '../../services/BudgetService/budget.service';
import { Budget } from '../../models/BudgetModel/budget.model';

@Component({
  selector: 'app-tracking-page',
  templateUrl: './tracking-page.component.html',
  styleUrls: ['./tracking-page.component.css'],
})
export class TrackingPageComponent {
  currentUser: any;
  budget: Budget = {
    budgetId: '',
    name: '',
    amount: 0,
    start_date: '',
    end_date: '',
    remaining_amount: 0,
  };
  @Output() newItemEvent = new EventEmitter<{
    type: string;
    name: string;
    amount: number;
  }>();

  constructor(
    private budgetService: BudgetService,
    private userService: UserService,
    private sessionstorageService: SessionStorageService
  ) {}

  ngOnInit() {
    const userid = this.sessionstorageService.getUid();
    this.budgetService.getBudget(userid!).then((budget) => {
      this.budget = budget as Budget;
    });
  }
}
