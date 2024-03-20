import { TestBed } from '@angular/core/testing';

import { TypeAbsenceService } from './type-absence.service';

describe('TypeAbsenceService', () => {
  let service: TypeAbsenceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypeAbsenceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
