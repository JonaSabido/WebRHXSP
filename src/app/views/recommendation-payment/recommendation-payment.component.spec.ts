import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecommendationPaymentComponent } from './recommendation-payment.component';

describe('RecommendationPaymentComponent', () => {
  let component: RecommendationPaymentComponent;
  let fixture: ComponentFixture<RecommendationPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecommendationPaymentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecommendationPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
