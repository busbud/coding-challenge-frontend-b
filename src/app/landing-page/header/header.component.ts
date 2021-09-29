import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { CurrencyService, LanguageService } from '@app/services';
import { Option } from '@app/shared/models';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  languages: Option[];
  selectedLanguage: string;
  currencies: Option[];
  selectedCurrency: string;
  private subscriptions: Subscription[] = [];

  constructor(
    private languageService: LanguageService,
    private currencyService: CurrencyService
  ) { }

  ngOnInit(): void {
    this.languages = this.languageService.getLanguageOptions();
    this.selectedLanguage = this.languageService.getLanguageValue();
    this.currencies = this.currencyService.getCurrencyOptions();
    this.selectedCurrency = this.currencyService.getCurrencyValue();

    this.subscriptions.push(this.languageService.getLanguage()
      .subscribe(lang => this.selectedLanguage = lang));

    this.subscriptions.push(this.currencyService.getCurrency()
      .subscribe(currency => this.selectedCurrency = currency));
  }

  ngOnDestroy(): void {
    // Prevent memory leaks
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  selectLanguage(lang: string) {
    this.languageService.setLanguage(lang);
  }

  selectCurrency(currency: string) {
    this.currencyService.setCurrency(currency);
  }

}
