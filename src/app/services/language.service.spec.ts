import { TestBed } from '@angular/core/testing';

import { LanguageService } from './language.service';


describe('LanguageService', () => {
  let service: LanguageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LanguageService);
  });

  it('initializes', () => {
    expect(service).toBeTruthy();
  });

  it('returns the list of languages', () => {
    expect(service.getLanguageOptions()).toEqual([
      { label: 'English', value: 'en' },
      { label: 'Française', value: 'fr' },
      { label: 'Español', value: 'es' }
    ]);
  });

  it('can be subscribed and read', () => {
    let language: string = '';
    service.getLanguage().subscribe(lang => language = lang);

    expect(language).toBe('en');
    expect(service.getLanguageValue()).toBe('en');
  });

  it('reacts to updates', () => {
    let language: string = '';
    service.getLanguage().subscribe(lang => language = lang);

    service.setLanguage('fr');

    expect(language).toBe('fr');
    expect(service.getLanguageValue()).toBe('fr');
  });
});
