import { Component, Input } from '@angular/core';
import { Observable, OperatorFunction } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, filter } from 'rxjs/operators';

import { CitySearchService, TripConfigService } from '../services';


@Component({
  selector: 'app-city-picker',
  templateUrl: './city-picker.component.html',
  styleUrls: ['./city-picker.component.scss']
})
export class CityPickerComponent {

  @Input() code: 'origin'|'destination' = 'origin';
  city: any;
  isInvalid: boolean = false;

  constructor(
    private citySearchService: CitySearchService,
    private tripConfigService: TripConfigService
  ) { }

  inputNameExtractor (city: { full_name: string, geohash: string }) {
    return city.full_name.split(',')[0];
  }

  resultNameExtractor (city: { full_name: string, geohash: string }) {
    const [cityName, ...extras] = city.full_name.split(',')
    return [cityName.toLocaleUpperCase(), ...extras].join(',');
  }

  selectCity(dirty: boolean = false) {
    const geohash = this.city ? this.city.geohash : '';
    this.isInvalid = dirty && !geohash;
    if (this.code === 'origin') {
      this.tripConfigService.setOrigin(geohash);
    } else {
      this.tripConfigService.setDestination(geohash);
    }
  }

  // This is done to trigger the selection when clicking on an option insteand of typing enter.
  delayedSelect() {
    setTimeout(() => this.selectCity(), 0);
  }

  searchCity: OperatorFunction<string, readonly {name: string, geohash: string}[]> = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      filter(search => search.length > 2),
      switchMap(query => this.citySearchService.search(query))
    )

}
