import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeReentryDialogComponent } from './employee-reentry-dialog.component';

describe('EmployeeReentryDialogComponent', () => {
  let component: EmployeeReentryDialogComponent;
  let fixture: ComponentFixture<EmployeeReentryDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeReentryDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmployeeReentryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
