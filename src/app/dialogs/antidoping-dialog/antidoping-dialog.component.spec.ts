import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AntidopingDialogComponent } from './antidoping-dialog.component';

describe('AntidopingDialogComponent', () => {
  let component: AntidopingDialogComponent;
  let fixture: ComponentFixture<AntidopingDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AntidopingDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AntidopingDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
