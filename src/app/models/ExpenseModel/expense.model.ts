export interface Expense {
  expenseId: string;
  amount: number;
  date: string; // Consider using a Date type if supported by Firebase
  name: string;
}
