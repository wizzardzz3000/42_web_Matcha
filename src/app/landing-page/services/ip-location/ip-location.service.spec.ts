import { TestBed } from '@angular/core/testing';

import { IpLocationService } from './ip-location.service';

describe('IpLocationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IpLocationService = TestBed.get(IpLocationService);
    expect(service).toBeTruthy();
  });
});
