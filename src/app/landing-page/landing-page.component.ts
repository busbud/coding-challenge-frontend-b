import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { DepartureService } from '@app/services';
import { Travel, TripSearch } from '@app/shared/models';


@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent {
  travelInfo: Travel;
  travelInfo$: Observable<Travel>;

  constructor(
    private departureService: DepartureService
  ) { }

  searchTrip(info: TripSearch) {
    this.travelInfo$ = this.departureService.getDepartures(info);
  }

}
