import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeLeaveDialogComponent } from './employee-leave-dialog.component';

describe('EmployeeLeaveDialogComponent', () => {
  let component: EmployeeLeaveDialogComponent;
  let fixture: ComponentFixture<EmployeeLeaveDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeLeaveDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmployeeLeaveDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
