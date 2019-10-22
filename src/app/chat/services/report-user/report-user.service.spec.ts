import { TestBed } from '@angular/core/testing';

import { ReportUserService } from './report-user.service';

describe('ReportUserService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ReportUserService = TestBed.get(ReportUserService);
    expect(service).toBeTruthy();
  });
});
