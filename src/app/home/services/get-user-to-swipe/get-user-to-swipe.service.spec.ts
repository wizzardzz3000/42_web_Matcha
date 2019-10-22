import { TestBed } from '@angular/core/testing';

import { GetUserToSwipeService } from './get-user-to-swipe.service';

describe('GetUserToSwipeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetUserToSwipeService = TestBed.get(GetUserToSwipeService);
    expect(service).toBeTruthy();
  });
});
