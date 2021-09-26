import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TripSearch } from '../services/departure.service';
import { TripConfigService } from './services/trip-config.service';

@Component({
  selector: 'app-trip-search',
  templateUrl: './trip-search.component.html',
  styleUrls: ['./trip-search.component.scss']
})
export class TripSearchComponent implements OnInit {
  @Output() tripSearched: EventEmitter<TripSearch> = new EventEmitter();
  public searchReady: boolean = false;

  constructor(
    private tripConfigService: TripConfigService
  ) { }

  ngOnInit(): void {
    this.tripConfigService.isSearchReady$.subscribe(isReady => this.searchReady = isReady)

    //TODO: Remove this, only for testing.
    this.tripConfigService.setOrigin('f25dvk');
    this.tripConfigService.setDestination('f2m673');
    setTimeout(() => this.tripSearched.emit(this.tripConfigService.getQueryData()), 100);
  }

  searchTrips() {
    this.tripSearched.emit(this.tripConfigService.getQueryData());
  }

}
