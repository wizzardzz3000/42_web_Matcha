import { TestBed } from '@angular/core/testing';

import { GetUserOnlineService } from './get-user-online.service';

describe('GetUserOnlineService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetUserOnlineService = TestBed.get(GetUserOnlineService);
    expect(service).toBeTruthy();
  });
});
