import { TestBed } from '@angular/core/testing';

import { FindCandidatesService } from './find-candidates.service';

describe('FindCandidatesService', () => {
  let service: FindCandidatesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FindCandidatesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
