import { TestBed } from '@angular/core/testing';

import { EmployeeDiseaseService } from './employee-disease.service';

describe('EmployeeDiseaseService', () => {
  let service: EmployeeDiseaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeeDiseaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
