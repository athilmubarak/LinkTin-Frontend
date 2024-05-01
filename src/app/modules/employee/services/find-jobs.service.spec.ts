import { TestBed } from '@angular/core/testing';

import { FindJobsService } from './find-jobs.service';

describe('FindJobsService', () => {
  let service: FindJobsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FindJobsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
