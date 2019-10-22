import { TestBed } from '@angular/core/testing';

import { EnterViewActivateService } from './enter-view-activate.service';

describe('EnterViewActivateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EnterViewActivateService = TestBed.get(EnterViewActivateService);
    expect(service).toBeTruthy();
  });
});
