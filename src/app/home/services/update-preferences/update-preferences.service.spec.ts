import { TestBed } from '@angular/core/testing';

import { UpdatePreferencesService } from './update-preferences.service';

describe('UpdatePreferencesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UpdatePreferencesService = TestBed.get(UpdatePreferencesService);
    expect(service).toBeTruthy();
  });
});
