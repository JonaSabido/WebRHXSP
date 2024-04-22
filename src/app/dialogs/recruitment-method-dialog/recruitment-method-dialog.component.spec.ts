import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruitmentMethodDialogComponent } from './recruitment-method-dialog.component';

describe('RecruitmentMethodDialogComponent', () => {
  let component: RecruitmentMethodDialogComponent;
  let fixture: ComponentFixture<RecruitmentMethodDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecruitmentMethodDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecruitmentMethodDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
