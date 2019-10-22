import { TestBed } from '@angular/core/testing';

import { RemoveUserTagService } from './remove-user-tag.service';

describe('RemoveUserTagService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RemoveUserTagService = TestBed.get(RemoveUserTagService);
    expect(service).toBeTruthy();
  });
});
