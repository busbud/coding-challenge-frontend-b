import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { TripSearch } from '../services/departure.service';
import { TripConfigService } from './services/trip-config.service';

@Component({
  selector: 'app-trip-search',
  templateUrl: './trip-search.component.html',
  styleUrls: ['./trip-search.component.scss']
})
export class TripSearchComponent implements OnInit, OnDestroy {
  @Output() tripSearched: EventEmitter<TripSearch> = new EventEmitter();
  public searchReady: boolean = false;
  private subscriptions: Subscription[] = [];

  constructor(
    private tripConfigService: TripConfigService
  ) { }

  ngOnInit(): void {
    this.tripConfigService.isSearchReady$.subscribe(isReady => this.searchReady = isReady)
  }

  ngOnDestroy(): void {
    // Prevent memory leaks
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  searchTrips() {
    this.tripSearched.emit(this.tripConfigService.getQueryData());
  }

}
