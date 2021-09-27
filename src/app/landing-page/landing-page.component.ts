import { Travel } from './../services/departure.service';
import { Component, OnInit } from '@angular/core';
import { DepartureService, TripSearch } from '../services/departure.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {
  travelInfo: Travel;

  constructor(
    private departureService: DepartureService
  ) { }

  ngOnInit(): void {
  }

  searchTrip(info: TripSearch) {
    this.departureService.getDepartures(info)
      .subscribe(travel => {
        this.travelInfo = travel;
        console.log("Llega info nueva", travel);
      });
  }

}
