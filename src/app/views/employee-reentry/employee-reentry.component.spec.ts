import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeReentryComponent } from './employee-reentry.component';

describe('EmployeeReentryComponent', () => {
  let component: EmployeeReentryComponent;
  let fixture: ComponentFixture<EmployeeReentryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeReentryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmployeeReentryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
