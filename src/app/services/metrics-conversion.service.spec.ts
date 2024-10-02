import { TestBed } from '@angular/core/testing';

import { MetricsConversionService } from './metrics-conversion.service';

describe('MetricsConversionService', () => {
  let service: MetricsConversionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MetricsConversionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
