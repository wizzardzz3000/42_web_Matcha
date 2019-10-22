import { TestBed } from '@angular/core/testing';

import { EnterViewSettingsService } from './enter-view-settings.service';

describe('EnterViewSettingsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EnterViewSettingsService = TestBed.get(EnterViewSettingsService);
    expect(service).toBeTruthy();
  });
});
