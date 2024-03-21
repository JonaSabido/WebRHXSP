import { TestBed } from '@angular/core/testing';

import { EmployeeReentryService } from './employee-reentry.service';

describe('EmployeeReentryService', () => {
  let service: EmployeeReentryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeeReentryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
