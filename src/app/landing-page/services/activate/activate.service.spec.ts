import { TestBed } from '@angular/core/testing';

import { ActivateService } from './activate.service';

describe('ActivateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ActivateService = TestBed.get(ActivateService);
    expect(service).toBeTruthy();
  });
});
