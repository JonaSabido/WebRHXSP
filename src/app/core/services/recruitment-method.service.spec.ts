import { TestBed } from '@angular/core/testing';

import { RecruitmentMethodService } from './recruitment-method.service';

describe('RecruitmentMethodService', () => {
  let service: RecruitmentMethodService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecruitmentMethodService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
