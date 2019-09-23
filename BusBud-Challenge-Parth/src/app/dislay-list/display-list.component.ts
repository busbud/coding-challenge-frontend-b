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
  private departuresSub: Subscription;
  isLoading = false;

  constructor(public departuresService: DeparturesService) {}

  ngOnInit() {
    this.isLoading = true;
    this.departuresSub = this.departuresService.getDepartureUpdateListener()
      .subscribe((departures: Departure[]) => {
        this.departures = departures;
        this.isLoading = false;
      });
  }

  ngOnDestroy() {
    this.departuresSub.unsubscribe();
  }
}
