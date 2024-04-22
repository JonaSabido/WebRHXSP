import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruitmentMethodComponent } from './recruitment-method.component';

describe('RecruitmentMethodComponent', () => {
  let component: RecruitmentMethodComponent;
  let fixture: ComponentFixture<RecruitmentMethodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecruitmentMethodComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecruitmentMethodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
