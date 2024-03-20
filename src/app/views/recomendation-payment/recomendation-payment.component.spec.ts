import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecomendationPaymentComponent } from './recomendation-payment.component';

describe('RecomendationPaymentComponent', () => {
  let component: RecomendationPaymentComponent;
  let fixture: ComponentFixture<RecomendationPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecomendationPaymentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecomendationPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
