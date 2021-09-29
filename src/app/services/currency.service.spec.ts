import { TestBed } from '@angular/core/testing';

import { CurrencyService } from './currency.service';


describe('CurrencyService', () => {
  let service: CurrencyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurrencyService);
  });

  it('initializes', () => {
    expect(service).toBeTruthy();
  });

  it('returns the list of currencies', () => {
    expect(service.getCurrencyOptions()).toEqual([
      { label: 'US$', value: 'USD' },
      { label: 'CA$', value: 'CAD' },
      { label: '€', value: 'EUR' }
    ]);
  });

  it('can be subscribed and read', () => {
    let currency: string = '';
    service.getCurrency().subscribe(curr => currency = curr);

    expect(currency).toBe('USD');
    expect(service.getCurrencyValue()).toBe('USD');
  });

  it('reacts to updates', () => {
    let currency: string = '';
    service.getCurrency().subscribe(curr => currency = curr);

    service.setCurrency('CA$');

    expect(currency).toBe('CA$');
    expect(service.getCurrencyValue()).toBe('CA$');
  });

});
