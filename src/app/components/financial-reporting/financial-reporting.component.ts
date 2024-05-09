import { Component, OnInit } from '@angular/core';
import { SavingGoalService } from '../../services/SavingGoalService/savinggoal.service';
import { SavingGoal } from '../../models/SavingGoalModel/savinggoal.model';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Component({
  selector: 'app-financial-reporting',
  templateUrl: './financial-reporting.component.html',
  styleUrls: ['./financial-reporting.component.css']
})
export class FinancialReportingComponent implements OnInit {
  savingGoals: SavingGoal[] = [];
  financialReports: any[] = []; 

  constructor(
    private savingGoalService: SavingGoalService,
    private db: AngularFireDatabase
  ) {}

  ngOnInit() {
    this.getSavingGoals();
  }

  getSavingGoals() {
    this.savingGoalService.getSavingGoals().subscribe((savingGoals) => {
      this.savingGoals = savingGoals;
      this.calculateProgress();
    });
  }

  calculateProgress() {
    this.financialReports = this.savingGoals.map((goal) => {
      const progress = (goal.current_amount / goal.amount) * 100;
      return {
        savingGoalId: goal.savingGoalId,
        name: goal.name,
        amount: goal.amount,
        currentAmount: goal.current_amount,
        target_date: goal.target_date,
        progress: progress
      };
    });
  }
}
