import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportTypeLeaveComponent } from './report-type-leave.component';

describe('ReportTypeLeaveComponent', () => {
  let component: ReportTypeLeaveComponent;
  let fixture: ComponentFixture<ReportTypeLeaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportTypeLeaveComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReportTypeLeaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
