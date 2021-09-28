import { Travel } from './../services/departure.service';
import { Component } from '@angular/core';
import { DepartureService, TripSearch } from '../services/departure.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent {
  travelInfo: Travel;

  constructor(
    private departureService: DepartureService
  ) { }

  searchTrip(info: TripSearch) {
    this.departureService.getDepartures(info)
      .subscribe(travel => {
        this.travelInfo = travel;
      });
  }

}
