export interface Income {
  incomeId: string;
  amount: number;
  name: string;
  date: string; // Consider using a Date type if supported by Firebase
}
