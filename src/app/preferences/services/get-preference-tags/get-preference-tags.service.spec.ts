import { TestBed } from '@angular/core/testing';

import { GetPreferenceTagsService } from './get-preference-tags.service';

describe('GetPreferenceTagsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetPreferenceTagsService = TestBed.get(GetPreferenceTagsService);
    expect(service).toBeTruthy();
  });
});
