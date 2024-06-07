import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportLeaveComponent } from './report-leave.component';

describe('ReportLeaveComponent', () => {
  let component: ReportLeaveComponent;
  let fixture: ComponentFixture<ReportLeaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportLeaveComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReportLeaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
