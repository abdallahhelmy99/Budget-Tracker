export interface Income {
  incomeId: string;
  amount: number;
  source: string;
  date: string; // Consider using a Date type if supported by Firebase
  description: string;
}
