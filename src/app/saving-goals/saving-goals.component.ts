import { Component, OnInit } from '@angular/core';
import { SavingGoalService } from '../services/SavingGoalService/savinggoal.service';
import { SavingGoal } from '../models/SavingGoalModel/savinggoal.model';

@Component({
  selector: 'app-saving-goals',
  templateUrl: './saving-goals.component.html',
  styleUrls: ['./saving-goals.component.css'],
})
export class SavingGoalsComponent implements OnInit {
  name: string = '';
  amount: number = 0;
  target_date: Date = new Date();
  current_amount: number = 0;
  savingGoals: SavingGoal[] = [];

  constructor(private savingGoalService: SavingGoalService) {}

  ngOnInit() {
    this.getSavingGoals();
  }

  async getSavingGoals() {
    this.savingGoals =
      (await this.savingGoalService.getSavingGoals().toPromise()) ?? [];
  }

  async createSavingGoal() {
    const savingGoal: SavingGoal = {
      savingGoalId: '',
      name: this.name,
      amount: this.amount,
      target_date: this.target_date.toISOString(),
      current_amount: 0,
    };
    await this.savingGoalService.createSavingGoal(savingGoal);
    this.getSavingGoals();
  }

  editSavingGoal(savingGoal: SavingGoal) {
    // Implement the logic for editing a saving goal
  }

  async deleteSavingGoal(savingGoalId: string) {
    await this.savingGoalService.deleteSavingGoal(savingGoalId);
    this.getSavingGoals();
  }
}
