import { TestBed } from '@angular/core/testing';
import { DOCUMENT } from '@angular/common';

import { LanguageService } from './language.service';
import { BrowserService } from './browser.service';
import { NAVIGATOR } from '@app/shared/tokens';


describe('BrowserService', () => {
  let service: BrowserService;

  let languageService: Partial<LanguageService>;
  let fakeNavigator: Partial<Navigator>;

  beforeEach(() => {
    languageService = jasmine.createSpyObj('LanguageService', ['setLanguage', 'getLanguageOptions']);
    (languageService.getLanguageOptions as jasmine.Spy).and.returnValue([
      { value: 'en' }, { value: 'fr' }, { value: 'es' }
    ]);
    fakeNavigator =  { languages: ['hr', 'en', 'fr'] };

    TestBed.configureTestingModule({
      providers: [
        { provide: LanguageService, useValue: languageService },
        { provide: NAVIGATOR, useValue: fakeNavigator },
      ]
    });
    service = TestBed.inject(BrowserService);
  });

  it('initializes', () => {
    expect(service).toBeTruthy();
  });

  it('sets default language from the options', () => {
    service.detectLanguage();

    expect(languageService.setLanguage).toHaveBeenCalledOnceWith('en');
  });

  it('if no supported language is found, does not change the language', () => {
    (fakeNavigator as any).languages = ['hr'];
    service.detectLanguage();

    expect(languageService.setLanguage).not.toHaveBeenCalled();
  });

  it('extracts the language properly', () => {
    (fakeNavigator as any).languages = ['hr', 'fr-CA'];
    service.detectLanguage();

    expect(languageService.setLanguage).toHaveBeenCalledOnceWith('fr');
  });
});
