import { TestBed } from '@angular/core/testing';

import { UpdateEmailService } from './update-email.service';

describe('UpdateEmailService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UpdateEmailService = TestBed.get(UpdateEmailService);
    expect(service).toBeTruthy();
  });
});
