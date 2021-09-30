import { Inject, Injectable } from '@angular/core';

import { LanguageService } from '@app/services';
import { NAVIGATOR } from '@app/shared/tokens';

@Injectable({
  providedIn: 'root'
})
export class BrowserService {

  constructor(
    private languageService: LanguageService,
    @Inject(NAVIGATOR) private readonly navigator: Navigator
  ) { }

  detectLanguage() {
    const supportedLanguages: string[] = this.languageService.getLanguageOptions().map(op => op.value);
    const languages = this.navigator.languages || [];
    const selectedLanguage = languages.map(lang => lang.split('-')[0]).find(lang => supportedLanguages.includes(lang));

    if (selectedLanguage) {
      this.languageService.setLanguage(selectedLanguage);
    }
  }
}
