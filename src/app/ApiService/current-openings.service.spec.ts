import { TestBed } from '@angular/core/testing';

import { CurrentOpeningsService } from './current-openings.service';

describe('CurrentOpeningsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CurrentOpeningsService = TestBed.get(CurrentOpeningsService);
    expect(service).toBeTruthy();
  });
});
