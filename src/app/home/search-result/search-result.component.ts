import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { BusbudService } from '../search-bar/busbud.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit, OnDestroy {
  departures: any[] = [];

  private results: Subscription;
  isLoading = false;

  // public result: any = {"departureTime":"23:00","arrivalTime":"06:50","locationName":"Port Authority","price":"6650.000","amenities":["display_name","wifi","toilet","ac","refreshment","food","hot_meal","power_outlets","tv","bus_attendant","leg_room","small_seat","average_seat","xl_seat","full_recline_seat"],"operator":{"id":"bfc27cd5-44ca-49c1-8d00-0f2bc00c58c0","source_id":155,"profile_id":580,"name":"Greyhound","logo_url":"https://busbud.imgix.net/operator-logos/logo_greyhound-og.png.png?h={height}&w={width}&auto=format&fit=fill&bg=0FFF","display_name":"Greyhound","review_state":"good","sellable":true,"fuzzy_prices":false,"sell_tickets_cutoff":{"minutes":30},"amenities":{"classes":{"Normal":{"display_name":"","wifi":true,"toilet":true,"ac":true,"refreshment":false,"food":false,"hot_meal":false,"power_outlets":true,"tv":false,"bus_attendant":false,"leg_room":false,"small_seat":false,"average_seat":true,"xl_seat":false,"full_recline_seat":false},"Economy":{"display_name":"","wifi":true,"toilet":true,"ac":true,"refreshment":false,"food":false,"hot_meal":false,"power_outlets":true,"tv":false,"bus_attendant":false,"leg_room":false,"small_seat":false,"average_seat":true,"xl_seat":false,"full_recline_seat":false}}},"source":"greyhound_us","referral_deal":false,"fraud_check":"iovation"},"refund":"no-refund"}

  constructor(public busbudService: BusbudService) {}

  ngOnInit() {
    this.isLoading = true;
    this.results = this.busbudService.getDepartureUpdateListener().subscribe((departures: any[]) => {
      this.departures = departures;
      this.isLoading = false;
    });
  }

  ngOnDestroy() {
    this.results.unsubscribe();
  }
}
