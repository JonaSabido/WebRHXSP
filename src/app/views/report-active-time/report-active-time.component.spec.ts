import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportActiveTimeComponent } from './report-active-time.component';

describe('ReportActiveTimeComponent', () => {
  let component: ReportActiveTimeComponent;
  let fixture: ComponentFixture<ReportActiveTimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportActiveTimeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReportActiveTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
