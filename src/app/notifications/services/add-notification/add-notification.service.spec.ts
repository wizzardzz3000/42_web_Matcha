import { TestBed } from '@angular/core/testing';

import { AddNotificationService } from './add-notification.service';

describe('AddNotificationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AddNotificationService = TestBed.get(AddNotificationService);
    expect(service).toBeTruthy();
  });
});
