import { TestBed } from '@angular/core/testing';

import { DeleteNotificationService } from './delete-notification.service';

describe('DeleteNotificationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DeleteNotificationService = TestBed.get(DeleteNotificationService);
    expect(service).toBeTruthy();
  });
});
