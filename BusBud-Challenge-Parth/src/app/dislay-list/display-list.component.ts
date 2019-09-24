import { Component, OnInit, OnDestroy } from '@angular/core';
import { Departure } from '../departure.model';
import { Subscription } from 'rxjs';
import { DeparturesService } from '../departures.service';

@Component({
  selector: 'app-display-list',
  templateUrl: './display-list.component.html',
  styleUrls: ['./display-list.component.css']
})
export class DisplayListComponent implements OnInit, OnDestroy {
  departures: Departure[] = [];
  isLoading = false;
  private departuresSub: Subscription;
  private isLoadingSub: Subscription;

  constructor(public departuresService: DeparturesService) {}

  ngOnInit() {
    this.isLoadingSub = this.departuresService.getIsLoadingUpdateListener()
      .subscribe((isLoading: boolean) => {
        this.isLoading = isLoading;
      });
    this.departuresSub = this.departuresService.getDepartureUpdateListener()
      .subscribe((departures: Departure[]) => {
        this.departures = departures;
      });
  }

  ngOnDestroy() {
    this.departuresSub.unsubscribe();
    this.isLoadingSub.unsubscribe();
  }
}
