import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AntidopingComponent } from './antidoping.component';

describe('AntidopingComponent', () => {
  let component: AntidopingComponent;
  let fixture: ComponentFixture<AntidopingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AntidopingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AntidopingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
