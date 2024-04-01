import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeVacationChartComponent } from './employee-vacation-chart.component';

describe('EmployeeVacationChartComponent', () => {
  let component: EmployeeVacationChartComponent;
  let fixture: ComponentFixture<EmployeeVacationChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeVacationChartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmployeeVacationChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
