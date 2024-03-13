import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeAbsenceComponent } from './type-absence.component';

describe('TypeAbsenceComponent', () => {
  let component: TypeAbsenceComponent;
  let fixture: ComponentFixture<TypeAbsenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TypeAbsenceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TypeAbsenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
