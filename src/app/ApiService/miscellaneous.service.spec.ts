import { TestBed } from '@angular/core/testing';

import { MiscellaneousService } from './miscellaneous.service';

describe('MiscellaneousService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MiscellaneousService = TestBed.get(MiscellaneousService);
    expect(service).toBeTruthy();
  });
});
