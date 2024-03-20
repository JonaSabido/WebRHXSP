import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeVacationDialogComponent } from './employee-vacation-dialog.component';

describe('EmployeeVacationDialogComponent', () => {
  let component: EmployeeVacationDialogComponent;
  let fixture: ComponentFixture<EmployeeVacationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeVacationDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmployeeVacationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
