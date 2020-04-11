import { TestBed } from '@angular/core/testing';

import { LatestDashboardDataService } from './latest-dashboard-data.service';

describe('LatestDashboardDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LatestDashboardDataService = TestBed.get(LatestDashboardDataService);
    expect(service).toBeTruthy();
  });
});
