import { TestBed } from '@angular/core/testing';

import { GetTagsService } from './get-tags.service';

describe('GetTagsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetTagsService = TestBed.get(GetTagsService);
    expect(service).toBeTruthy();
  });
});
