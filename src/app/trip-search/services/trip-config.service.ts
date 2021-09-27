import { CurrencyService } from './../../services/currency.service';
import { LanguageService } from './../../services/language.service';
import { TripSearch } from './../../services/departure.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TripConfigService {
  private origin: string = '';
  private destination: string = '';
  private outboundDate: string = "";
  private adult: number = 1;
  private child: number = 0;
  private senior: number = 0;

  public isSearchReady$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private languageService: LanguageService,
    private currencyService: CurrencyService
  ) { }

  getQueryData(): TripSearch {
    return {
      origin: this.origin,
      destination: this.destination,
      outboundDate: this.outboundDate,
      adult: this.adult,
      child: this.child,
      senior: this.senior,
      currency: this.currencyService.getCurrencyValue(),
      lang: this.languageService.getLanguageValue()
    }
  }

  setOrigin(originGeohash: string) {
    this.origin = originGeohash;
    this.checkReady();
  }

  setDestination(destinationGeohash: string) {
    this.destination = destinationGeohash;
    this.checkReady();
  }

  setOutboundDate(outboundDate: string) {
    this.outboundDate = outboundDate;
    this.checkReady();
  }

  setPassengers({ adult, child, senior }: { adult: number, child: number, senior: number }) {
    this.adult = adult;
    this.child = child;
    this.senior = senior;
    this.checkReady();
  }

  private checkReady() {
    this.isSearchReady$.next(this.hasRouteAndDate() && this.hasPassengers());
  }

  private hasRouteAndDate() {
    return !!this.origin && !!this.destination && !!this.outboundDate;
  }

  private hasPassengers() {
    return this.adult + this.child + this.senior > 0;
  }
}
