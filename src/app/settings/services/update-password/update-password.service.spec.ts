import { TestBed } from '@angular/core/testing';

import { UpdatePasswordService } from './update-password.service';

describe('UpdatePasswordService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UpdatePasswordService = TestBed.get(UpdatePasswordService);
    expect(service).toBeTruthy();
  });
});
