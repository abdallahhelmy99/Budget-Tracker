import { Component, OnInit } from '@angular/core';
import { SavingGoalService } from '../../services/SavingGoalService/savinggoal.service';
import { SavingGoal } from '../../models/SavingGoalModel/savinggoal.model';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-financial-reporting',
  templateUrl: './financial-reporting.component.html',
  styleUrls: ['./financial-reporting.component.css'],
})
export class FinancialReportingComponent implements OnInit {
  savingGoals: SavingGoal[] = [];
  financialReports: any[] = [];

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
      this.calculateProgress();
    });
  }

  calculateProgress() {
    const today = new Date(); // Get today's date
    this.financialReports = this.savingGoals.map((goal) => {
      const progress = (goal.current_amount / goal.amount) * 100;
      const pastDue = new Date(goal.target_date) < today;
      return {
        savingGoalId: goal.savingGoalId,
        name: goal.name,
        amount: goal.amount,
        currentAmount: goal.current_amount,
        target_date: goal.target_date,
        progress: progress,
        pastDue: pastDue,
      };
    });
  }

  exportFinancialReportAsPdf() {
    const doc = new jsPDF();
    doc.setFontSize(12);
    doc.text('Financial Report', 10, 10);
    let y = 20;
    this.financialReports.forEach((report) => {
      doc.text(`Name: ${report.name}`, 10, y);
      doc.text(`Amount: ${report.amount}`, 10, y + 10);
      doc.text(`Current Amount: ${report.currentAmount}`, 10, y + 20);
      doc.text(`Progress: ${report.progress}%`, 10, y + 30);
      if (report.pastDue) {
        doc.text('Past due date', 10, y + 40);
      }
      doc.text('----------------------', 10, y + 50);
      y += 60;
    });
    doc.save('financial_report.pdf');
  }
}
