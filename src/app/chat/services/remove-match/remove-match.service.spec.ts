import { TestBed } from '@angular/core/testing';

import { RemoveMatchService } from './remove-match.service';

describe('RemoveMatchService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RemoveMatchService = TestBed.get(RemoveMatchService);
    expect(service).toBeTruthy();
  });
});
