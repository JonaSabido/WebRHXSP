import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeAbsenceDialogComponent } from './type-absence-dialog.component';

describe('TypeAbsenceDialogComponent', () => {
  let component: TypeAbsenceDialogComponent;
  let fixture: ComponentFixture<TypeAbsenceDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TypeAbsenceDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TypeAbsenceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
