import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Chart, LineController, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, BarController, BarElement, DoughnutController, ArcElement } from 'chart.js';

Chart.register(LineController, BarController, BarElement, DoughnutController, ArcElement, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements AfterViewInit {
  @ViewChild('incomeChart') incomeChartRef: ElementRef = {} as ElementRef;
  @ViewChild('expensesChart') expensesChartRef: ElementRef = {} as ElementRef;
  @ViewChild('savingsGoalsChart') savingsGoalsChartRef: ElementRef = {} as ElementRef;

  ngAfterViewInit() {
    new Chart(this.incomeChartRef.nativeElement, {
      type: 'line',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [{
          label: 'Income',
          data: [65, 59, 80, 81, 56, 55, 40],
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        }]
      }
    });

    new Chart(this.expensesChartRef.nativeElement, {
      type: 'bar',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [{
          label: 'Expenses',
          data: [65, 59, 80, 81, 56, 55, 40],
          backgroundColor: 'rgb(255, 99, 132)',
        }]
      }
    });

    new Chart(this.savingsGoalsChartRef.nativeElement, {
      type: 'doughnut',
      data: {
        labels: ['Savings Goal 1', 'Savings Goal 2', 'Savings Goal 3'],
        datasets: [{
          label: 'Savings Goals',
          data: [300, 50, 100],
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)'
          ],
          hoverOffset: 4
        }]
      }
    });
  }
}