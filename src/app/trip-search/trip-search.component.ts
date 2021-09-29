import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';

import { TripConfigService } from './services';
import { TripSearch } from '../shared/models';


@Component({
  selector: 'app-trip-search',
  templateUrl: './trip-search.component.html',
  styleUrls: ['./trip-search.component.scss']
})
export class TripSearchComponent implements OnInit {
  @Output() tripSearched: EventEmitter<TripSearch> = new EventEmitter();
  public searchReady$: Observable<boolean>;

  constructor(
    private tripConfigService: TripConfigService
  ) { }

  ngOnInit(): void {
    this.searchReady$ = this.tripConfigService.isSearchReady$;
  }

  searchTrips() {
    this.tripSearched.emit(this.tripConfigService.getQueryData());
  }

}
