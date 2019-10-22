import { TestBed } from '@angular/core/testing';

import { DeletePhotoService } from './delete-photo.service';

describe('DeletePhotoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DeletePhotoService = TestBed.get(DeletePhotoService);
    expect(service).toBeTruthy();
  });
});
