import { TestBed } from '@angular/core/testing';

import { UploadPhotoService } from './upload-photo.service';

describe('UploadPhotoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UploadPhotoService = TestBed.get(UploadPhotoService);
    expect(service).toBeTruthy();
  });
});
