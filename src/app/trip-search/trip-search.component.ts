import { Component, OnInit } from '@angular/core';
import { TripConfigService } from './services/trip-config.service';

@Component({
  selector: 'app-trip-search',
  templateUrl: './trip-search.component.html',
  styleUrls: ['./trip-search.component.scss']
})
export class TripSearchComponent implements OnInit {
  public searchReady: boolean = false;

  constructor(
    private tripConfigService: TripConfigService
  ) { }

  ngOnInit(): void {
    this.tripConfigService.isSearchReady$.subscribe(isReady => this.searchReady = isReady)
  }

  searchTrips() {
    console.log('Buscamos viajes', this.tripConfigService.getQueryData());
  }

}
