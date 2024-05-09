import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { TrackingPageComponent } from './components/tracking-page/tracking-page.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RegisterComponent } from './components/register/register.component';
import { FinancialReportingComponent } from './components/financial-reporting/financial-reporting.component';
import { SavingGoalsComponent } from './components/saving-goals/saving-goals.component';
import { BudgetManagementComponent } from './components/budget-management/budget-management.component';
import { AuthService } from './services/AuthService/auth.service';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthService] },
  {
    path: 'tracking',
    component: TrackingPageComponent,
    canActivate: [AuthService],
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthService],
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [AuthService],
  },
  {
    path: 'budget',
    component: BudgetManagementComponent,
    canActivate: [AuthService],
  },
  {
    path: 'savinggoal',
    component: SavingGoalsComponent,
    canActivate: [AuthService],
  },
  {
    path: 'financialreporting',
    component: FinancialReportingComponent,
    canActivate: [AuthService],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
