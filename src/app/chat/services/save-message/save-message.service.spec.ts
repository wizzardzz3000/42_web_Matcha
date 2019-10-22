import { TestBed } from '@angular/core/testing';

import { SaveMessageService } from './save-message.service';

describe('SaveMessageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SaveMessageService = TestBed.get(SaveMessageService);
    expect(service).toBeTruthy();
  });
});
