import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Option } from '../shared/dropdown-selector/dropdown-selector.component';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  currency$: BehaviorSubject<string> = new BehaviorSubject('USD');  

  constructor() { }

  getCurrencyOptions(): Option[] {
    return [
      { label: 'US$', value: 'USD' },
      { label: 'CAD', value: 'CAD' },
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
