import { TestBed } from '@angular/core/testing';

import { ExtraTimeService } from './extra-time.service';

describe('ExtraTimeService', () => {
  let service: ExtraTimeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExtraTimeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
