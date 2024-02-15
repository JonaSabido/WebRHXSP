import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeDiseaseComponent } from './employee-disease.component';

describe('EmployeeDiseaseComponent', () => {
  let component: EmployeeDiseaseComponent;
  let fixture: ComponentFixture<EmployeeDiseaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeDiseaseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmployeeDiseaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
