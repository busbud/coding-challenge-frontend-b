import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { Option } from '@app/shared/models';


@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  currency$: BehaviorSubject<string> = new BehaviorSubject('USD');

  getCurrencyOptions(): Option[] {
    return [
      { label: 'US$', value: 'USD' },
      { label: 'CA$', value: 'CAD' },
      { label: '€', value: 'EUR' }
    ];
  }

  getCurrency(): Observable<string> {
    return this.currency$.asObservable();
  }

  getCurrencyValue(): string {
    return this.currency$.value;
  }

  setCurrency(currency: string) {
    this.currency$.next(currency);
  }
}
