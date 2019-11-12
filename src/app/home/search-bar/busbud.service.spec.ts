import { TestBed } from '@angular/core/testing';

import { BusbudService } from './busbud.service';

describe('BusbudService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BusbudService = TestBed.get(BusbudService);
    expect(service).toBeTruthy();
  });
});
