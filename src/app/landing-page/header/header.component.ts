import { Component, OnInit } from '@angular/core';

import { CurrencyService, LanguageService } from '@app/services';
import { Option } from '@app/shared/models';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  languages: Option[];
  currencies: Option[];

  constructor(
    public languageService: LanguageService,
    public currencyService: CurrencyService
  ) { }

  ngOnInit(): void {
    this.languages = this.languageService.getLanguageOptions();
    this.currencies = this.currencyService.getCurrencyOptions();
  }

  selectLanguage(lang: string) {
    this.languageService.setLanguage(lang);
  }

  selectCurrency(currency: string) {
    this.currencyService.setCurrency(currency);
  }

}
