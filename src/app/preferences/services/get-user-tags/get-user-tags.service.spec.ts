import { TestBed } from '@angular/core/testing';

import { GetUserTagsService } from './get-user-tags.service';

describe('GetUserTagsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetUserTagsService = TestBed.get(GetUserTagsService);
    expect(service).toBeTruthy();
  });
});
