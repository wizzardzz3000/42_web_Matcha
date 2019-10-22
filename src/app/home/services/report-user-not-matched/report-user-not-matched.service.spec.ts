import { TestBed } from '@angular/core/testing';

import { ReportUserNotMatchedService } from './report-user-not-matched.service';

describe('ReportUserNotMatchedService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ReportUserNotMatchedService = TestBed.get(ReportUserNotMatchedService);
    expect(service).toBeTruthy();
  });
});
