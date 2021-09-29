import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { Option } from '@app/shared/models';


@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  language$: BehaviorSubject<string> = new BehaviorSubject('en');

  getLanguageOptions(): Option[] {
    return [
      { label: 'English', value: 'en' },
      { label: 'Française', value: 'fr' },
      { label: 'Español', value: 'es' }
    ];
  }

  getLanguage(): Observable<string> {
    return this.language$.asObservable();
  }

  getLanguageValue(): string {
    return this.language$.value;
  }

  setLanguage(language: string) {
    this.language$.next(language);
  }
}
