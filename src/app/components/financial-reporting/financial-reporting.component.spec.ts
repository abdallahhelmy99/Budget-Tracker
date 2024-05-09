import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancialReportingComponent } from './financial-reporting.component';

describe('FinancialReportingComponent', () => {
  let component: FinancialReportingComponent;
  let fixture: ComponentFixture<FinancialReportingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FinancialReportingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FinancialReportingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
