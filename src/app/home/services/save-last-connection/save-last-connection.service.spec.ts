import { TestBed } from '@angular/core/testing';

import { SaveLastConnectionService } from './save-last-connection.service';

describe('SaveLastConnectionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SaveLastConnectionService = TestBed.get(SaveLastConnectionService);
    expect(service).toBeTruthy();
  });
});
