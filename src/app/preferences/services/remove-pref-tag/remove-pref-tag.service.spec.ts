import { TestBed } from '@angular/core/testing';

import { RemovePrefTagService } from './remove-pref-tag.service';

describe('RemovePrefTagService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RemovePrefTagService = TestBed.get(RemovePrefTagService);
    expect(service).toBeTruthy();
  });
});
