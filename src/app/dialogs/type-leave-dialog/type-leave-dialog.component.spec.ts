import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeLeaveDialogComponent } from './type-leave-dialog.component';

describe('TypeLeaveDialogComponent', () => {
  let component: TypeLeaveDialogComponent;
  let fixture: ComponentFixture<TypeLeaveDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TypeLeaveDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TypeLeaveDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
