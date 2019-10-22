import { TestBed } from '@angular/core/testing';

import { GetNotificationsService } from './get-notifications.service';

describe('GetNotificationsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetNotificationsService = TestBed.get(GetNotificationsService);
    expect(service).toBeTruthy();
  });
});
