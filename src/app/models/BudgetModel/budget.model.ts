export interface Budget {
  budgetId: string;
  name: string;
  amount: number;
  start_date: string; // Consider using a Date type if supported by Firebase
  end_date: string; // Consider using a Date type if supported by Firebase
  remaining_amount: number;
}
