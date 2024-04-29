import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import {
  Chart,
  LineController,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarController,
  BarElement,
  DoughnutController,
  ArcElement,
} from 'chart.js';

import { ExpenseService } from '../../services/ExpenseService/expense.service';
import { IncomeService } from '../../services/IncomeService/income.service';
import { SavingGoalService } from '../../services/SavingGoalService/savinggoal.service';

Chart.register(
  LineController,
  BarController,
  BarElement,
  DoughnutController,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements AfterViewInit {
  @ViewChild('incomeChart') incomeChartRef: ElementRef = {} as ElementRef;
  @ViewChild('expensesChart') expensesChartRef: ElementRef = {} as ElementRef;
  @ViewChild('savingsGoalsChart') savingsGoalsChartRef: ElementRef =
    {} as ElementRef;

  constructor(
    private expenseService: ExpenseService,
    private incomeService: IncomeService,
    private savingGoalService: SavingGoalService
  ) {}

  ngAfterViewInit() {
    this.incomeService.getIncomes().subscribe((incomes) => {
      new Chart(this.incomeChartRef.nativeElement, {
        type: 'line',
        data: {
          labels: incomes.map((income) => income.date), // replace with your date property
          datasets: [
            {
              label: 'Income',
              data: incomes.map((income) => income.amount), // replace with your amount property
              fill: false,
              borderColor: 'rgb(75, 192, 192)',
              tension: 0.1,
            },
          ],
        },
      });
    });

    this.expenseService.getExpenses().subscribe((expenses) => {
      new Chart(this.expensesChartRef.nativeElement, {
        type: 'bar',
        data: {
          labels: expenses.map((expense) => expense.date),
          datasets: [
            {
              label: 'Expenses',
              data: expenses.map((expense) => expense.amount), // replace with your amount property
              backgroundColor: 'rgb(255, 99, 132)',
            },
          ],
        },
      });
    });

    this.savingGoalService.getSavingGoals().subscribe((savingGoals) => {
      new Chart(this.savingsGoalsChartRef.nativeElement, {
        type: 'doughnut',
        data: {
          labels: savingGoals.map((savingGoal) => savingGoal.name), // replace with your name property
          datasets: [
            {
              label: 'Savings Goals',
              data: savingGoals.map((savingGoal) => savingGoal.amount), // replace with your amount property
              backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)',
              ],
              hoverOffset: 4,
            },
          ],
        },
      });
    });
  }
}
