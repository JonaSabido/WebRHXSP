import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardEmployeeFileComponent } from './card-employee-file.component';

describe('CardEmployeeFileComponent', () => {
  let component: CardEmployeeFileComponent;
  let fixture: ComponentFixture<CardEmployeeFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardEmployeeFileComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardEmployeeFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
