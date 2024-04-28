export interface SavingGoal {
  savingGoalId: string;
  name: string;
  amount: number;
  target_date: string; // Consider using a Date type if supported by Firebase
  current_amount: number;
}
