import { LanguageService } from './../../services/language.service';
import { Component, OnInit } from '@angular/core';
import { Option } from 'src/app/shared/dropdown-selector/dropdown-selector.component';
import { CurrencyService } from 'src/app/services/currency.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  languages: Option[];
  selectedLanguage: string;
  currencies: Option[];
  selectedCurrency: string;

  constructor(
    private languageService: LanguageService,
    private currencyService: CurrencyService
  ) { }

  ngOnInit(): void {
    this.languages = this.languageService.getLanguageOptions();
    this.selectedLanguage = this.languageService.getLanguageValue();
    this.currencies = this.currencyService.getCurrencyOptions();
    this.selectedCurrency = this.currencyService.getCurrencyValue();
  }

  selectLanguage(lang: string) {
    this.languageService.setLanguage(lang);
  }

  selectCurrency(currency: string) {
    this.currencyService.setCurrency(currency);
  }

}
