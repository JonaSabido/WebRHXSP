import { TestBed } from '@angular/core/testing';

import { VacationTimeService } from './vacation-time.service';

describe('VacationTimeService', () => {
  let service: VacationTimeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VacationTimeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
