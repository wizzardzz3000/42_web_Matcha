import { TestBed } from '@angular/core/testing';

import { GetUserPhotosService } from './get-user-photos.service';

describe('GetUserPhotosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetUserPhotosService = TestBed.get(GetUserPhotosService);
    expect(service).toBeTruthy();
  });
});
