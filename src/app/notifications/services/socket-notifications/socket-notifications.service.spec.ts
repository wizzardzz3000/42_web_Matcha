import { TestBed } from '@angular/core/testing';

import { SocketNotificationsService } from './socket-notifications.service';

describe('SocketNotificationsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SocketNotificationsService = TestBed.get(SocketNotificationsService);
    expect(service).toBeTruthy();
  });
});
