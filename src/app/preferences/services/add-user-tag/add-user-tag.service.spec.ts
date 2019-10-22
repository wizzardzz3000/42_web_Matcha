import { TestBed } from '@angular/core/testing';

import { AddUserTagService } from './add-user-tag.service';

describe('AddUserTagService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AddUserTagService = TestBed.get(AddUserTagService);
    expect(service).toBeTruthy();
  });
});
