import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecomendationDialogComponent } from './recomendation-dialog.component';

describe('RecomendationDialogComponent', () => {
  let component: RecomendationDialogComponent;
  let fixture: ComponentFixture<RecomendationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecomendationDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecomendationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
