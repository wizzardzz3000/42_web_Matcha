import { TestBed } from '@angular/core/testing';

import { EnterViewChatService } from './enter-view-chat.service';

describe('EnterViewChatService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EnterViewChatService = TestBed.get(EnterViewChatService);
    expect(service).toBeTruthy();
  });
});
