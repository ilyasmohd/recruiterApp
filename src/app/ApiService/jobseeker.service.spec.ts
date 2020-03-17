import { TestBed } from '@angular/core/testing';

import { JobseekerService } from './jobseeker.service';

describe('JobseekerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: JobseekerService = TestBed.get(JobseekerService);
    expect(service).toBeTruthy();
  });
});
