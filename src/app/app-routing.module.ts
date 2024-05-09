import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { TrackingPageComponent } from './components/tracking-page/tracking-page.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RegisterComponent } from './components/register/register.component';
import { BudgetManagementComponent } from './budget-management/budget-management.component';
import { SavingGoalsComponent } from './saving-goals/saving-goals.component';
import { FinancialReportingComponent } from './components/financial-reporting/financial-reporting.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'tracking', component: TrackingPageComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'budget', component: BudgetManagementComponent },
  { path: 'savinggoal', component: SavingGoalsComponent },
  {path: 'financialreporting', component: FinancialReportingComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
