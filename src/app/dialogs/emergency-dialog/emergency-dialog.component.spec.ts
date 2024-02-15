import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmergencyDialogComponent } from './emergency-dialog.component';

describe('EmergencyDialogComponent', () => {
  let component: EmergencyDialogComponent;
  let fixture: ComponentFixture<EmergencyDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmergencyDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmergencyDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
