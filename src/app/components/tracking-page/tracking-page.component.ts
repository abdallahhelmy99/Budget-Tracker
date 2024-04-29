// tracking-page.component.ts
import { Component, Output, EventEmitter } from '@angular/core';
import { BudgetService } from '../../services/BudgetService/budget.service';
import { Budget } from '../../models/BudgetModel/budget.model';

@Component({
  selector: 'app-tracking-page',
  templateUrl: './tracking-page.component.html',
  styleUrls: ['./tracking-page.component.css'],
})
export class TrackingPageComponent {
  currentUser: any;
  budget: Budget | undefined;
  @Output() newItemEvent = new EventEmitter<{
    type: string;
    name: string;
    amount: number;
  }>();

  constructor(private budgetService: BudgetService) {}

  ngOnInit(): void {
    this.budgetService.getBudgets().subscribe((budgets) => {
      this.budget = budgets[0];
    });
  }
}
