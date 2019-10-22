import { TestBed } from '@angular/core/testing';

import { EnterViewHomeService } from './enter-view-home.service';

describe('EnterViewHomeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EnterViewHomeService = TestBed.get(EnterViewHomeService);
    expect(service).toBeTruthy();
  });
});
