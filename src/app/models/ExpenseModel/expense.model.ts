export interface Expense {
  expenseId: string;
  amount: number;
  category_id: string;
  date: string; // Consider using a Date type if supported by Firebase
  description: string;
}
