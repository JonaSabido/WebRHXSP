import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UniformDialogComponent } from './uniform-dialog.component';

describe('UniformDialogComponent', () => {
  let component: UniformDialogComponent;
  let fixture: ComponentFixture<UniformDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UniformDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UniformDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
