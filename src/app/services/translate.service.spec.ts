import { TestBed } from '@angular/core/testing';

import { TranslateService } from './translate.service';


describe('TranslateService', () => {
  let service: TranslateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TranslateService);
  });

  it('initializes', () => {
    expect(service).toBeTruthy();
  });
});
