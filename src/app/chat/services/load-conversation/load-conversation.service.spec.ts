import { TestBed } from '@angular/core/testing';

import { LoadConversationService } from './load-conversation.service';

describe('LoadConversationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LoadConversationService = TestBed.get(LoadConversationService);
    expect(service).toBeTruthy();
  });
});
