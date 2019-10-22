import { TestBed } from '@angular/core/testing';

import { SaveNewPasswordService } from './save-new-password.service';

describe('SaveNewPasswordService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SaveNewPasswordService = TestBed.get(SaveNewPasswordService);
    expect(service).toBeTruthy();
  });
});
