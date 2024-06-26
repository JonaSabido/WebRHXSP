import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiseaseDialogComponent } from './disease-dialog.component';

describe('DiseaseDialogComponent', () => {
  let component: DiseaseDialogComponent;
  let fixture: ComponentFixture<DiseaseDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiseaseDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DiseaseDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
