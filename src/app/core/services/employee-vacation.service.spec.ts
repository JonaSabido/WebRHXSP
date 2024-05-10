import { TestBed } from '@angular/core/testing';

import { EmployeeVacationService } from './employee-vacation.service';

describe('EmployeeVacationService', () => {
  let service: EmployeeVacationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeeVacationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
