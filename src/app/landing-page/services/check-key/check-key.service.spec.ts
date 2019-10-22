import { TestBed } from '@angular/core/testing';

import { CheckKeyService } from './check-key.service';

describe('CheckKeyService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CheckKeyService = TestBed.get(CheckKeyService);
    expect(service).toBeTruthy();
  });
});
