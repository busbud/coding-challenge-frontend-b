import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable, OperatorFunction } from 'rxjs';
import {debounceTime, distinctUntilChanged, switchMap, filter, timeout} from 'rxjs/operators';
import { CitySearchService } from '../services/city-search.service';

@Component({
  selector: 'app-city-picker',
  templateUrl: './city-picker.component.html',
  styleUrls: ['./city-picker.component.scss']
})
export class CityPickerComponent implements OnInit {

  @Input() placeholder: string = '';
  @Output() citySelected: EventEmitter<string> = new EventEmitter();
  public city: any;

  constructor(
    private citySearchService: CitySearchService
  ) { }

  ngOnInit(): void {
  }

  inputNameExtractor = (city: {name: string, geohash: string}) => city.name;
  resultNameExtractor = (city: {name: string, geohash: string}) => this.inputNameExtractor(city).toLocaleUpperCase();

  selectCity() {
    this.citySelected.emit(this.city ? this.city.geohash : "");
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
