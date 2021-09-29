import { TestBed } from '@angular/core/testing';

import { TripConfigService } from './trip-config.service';


describe('TripConfigService', () => {
  let service: TripConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TripConfigService);
  });

  it('initializes', () => {
    expect(service).toBeTruthy();
  });
});
