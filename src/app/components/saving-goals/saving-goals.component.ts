import { Component, OnInit } from '@angular/core';
import { SavingGoalService } from '../services/SavingGoalService/savinggoal.service';
import { SavingGoal } from '../models/SavingGoalModel/savinggoal.model';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Component({
  selector: 'app-saving-goals',
  templateUrl: './saving-goals.component.html',
  styleUrls: ['./saving-goals.component.css'],
})
export class SavingGoalsComponent implements OnInit {
  savingGoals: SavingGoal[] = [];
  newGoal: SavingGoal = {
    savingGoalId: '',
    name: '',
    amount: 0,
    target_date: '',
    current_amount: 0,
  };
  editingSavingGoalId: string | null = null;

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
    });
  }

  async createSavingGoal() {
    const savingGoal: SavingGoal = {
      savingGoalId: this.db.database.ref('savingGoals').push().key!,
      name: this.newGoal.name,
      amount: this.newGoal.amount,
      target_date: this.newGoal.target_date.toString(),
      current_amount: 0,
    };
    await this.savingGoalService.createSavingGoal(savingGoal);
    this.getSavingGoals();
  }

  async updateSavingGoal() {
    if (this.newGoal.savingGoalId) {
      await this.savingGoalService.updateSavingGoal(this.newGoal);
      this.newGoal = {
        savingGoalId: '',
        name: '',
        amount: 0,
        target_date: '',
        current_amount: 0,
      };
      this.getSavingGoals();
    }
  }

  editSavingGoal(goal: SavingGoal) {
    this.newGoal = { ...goal };
    this.editingSavingGoalId = goal.savingGoalId;
  }

  async deleteSavingGoal(savingGoalId: string) {
    await this.savingGoalService.deleteSavingGoal(savingGoalId);
    this.getSavingGoals();
  }
}
