import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportRecruitmentMethodComponent } from './report-recruitment-method.component';

describe('ReportRecruitmentMethodComponent', () => {
  let component: ReportRecruitmentMethodComponent;
  let fixture: ComponentFixture<ReportRecruitmentMethodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportRecruitmentMethodComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReportRecruitmentMethodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
