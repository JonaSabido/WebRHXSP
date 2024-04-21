import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecomendationPaymentDialogComponent } from './recomendation-payment-dialog.component';

describe('RecomendationPaymentDialogComponent', () => {
  let component: RecomendationPaymentDialogComponent;
  let fixture: ComponentFixture<RecomendationPaymentDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecomendationPaymentDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecomendationPaymentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
