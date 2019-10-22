import { TestBed } from '@angular/core/testing';

import { AddPrefTagService } from './add-pref-tag.service';

describe('AddPrefTagService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AddPrefTagService = TestBed.get(AddPrefTagService);
    expect(service).toBeTruthy();
  });
});
