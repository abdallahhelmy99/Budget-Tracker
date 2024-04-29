import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule } from '@angular/forms';
import { TrackingPageComponent } from './components/tracking-page/tracking-page.component';
import { IncomeExpenseListComponent } from './components/income-expense-list/income-expense-list.component';
import { AddComponent } from './components/add/add.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RegisterComponent } from './components/register/register.component';
import {
  AngularFireDatabase,
  AngularFireDatabaseModule,
} from '@angular/fire/compat/database';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire/compat';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const firebaseConfig = {
  apiKey: 'AIzaSyApLtsOeQvx2_HdGvsw4jY1GqIb5ufHb90',
  authDomain: 'expense-tracker-e28de.firebaseapp.com',
  databaseURL: 'https://expense-tracker-e28de-default-rtdb.firebaseio.com',
  projectId: 'expense-tracker-e28de',
  storageBucket: 'expense-tracker-e28de.appspot.com',
  messagingSenderId: '600775667487',
  appId: '1:600775667487:web:0ff5de9e400fbf2a108a2a',
};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    TrackingPageComponent,
    IncomeExpenseListComponent,
    AddComponent,
    DashboardComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    BrowserAnimationsModule,
  ],
  providers: [
    provideClientHydration(),
    AngularFireDatabaseModule,
    AngularFireDatabase,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
