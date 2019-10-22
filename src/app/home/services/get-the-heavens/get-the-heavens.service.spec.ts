import { TestBed } from '@angular/core/testing';

import { GetTheHeavensService } from './get-the-heavens.service';

describe('GetTheHeavensService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetTheHeavensService = TestBed.get(GetTheHeavensService);
    expect(service).toBeTruthy();
  });
});
