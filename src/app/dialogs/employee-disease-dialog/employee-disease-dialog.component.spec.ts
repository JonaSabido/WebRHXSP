import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeDiseaseDialogComponent } from './employee-disease-dialog.component';

describe('EmployeeDiseaseDialogComponent', () => {
  let component: EmployeeDiseaseDialogComponent;
  let fixture: ComponentFixture<EmployeeDiseaseDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeDiseaseDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmployeeDiseaseDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
