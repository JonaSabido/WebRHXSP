import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeLeaveComponent } from './type-leave.component';

describe('TypeLeaveComponent', () => {
  let component: TypeLeaveComponent;
  let fixture: ComponentFixture<TypeLeaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TypeLeaveComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TypeLeaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
