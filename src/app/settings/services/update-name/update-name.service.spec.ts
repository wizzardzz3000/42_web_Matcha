import { TestBed } from '@angular/core/testing';

import { UpdateNameService } from './update-name.service';

describe('UpdateNameService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UpdateNameService = TestBed.get(UpdateNameService);
    expect(service).toBeTruthy();
  });
});
