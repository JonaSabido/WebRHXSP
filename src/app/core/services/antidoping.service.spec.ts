import { TestBed } from '@angular/core/testing';

import { AntidopingService } from './antidoping.service';

describe('AntidopingService', () => {
  let service: AntidopingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AntidopingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
