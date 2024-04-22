import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtraTimeDialogComponent } from './extra-time-dialog.component';

describe('ExtraTimeDialogComponent', () => {
  let component: ExtraTimeDialogComponent;
  let fixture: ComponentFixture<ExtraTimeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExtraTimeDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExtraTimeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
