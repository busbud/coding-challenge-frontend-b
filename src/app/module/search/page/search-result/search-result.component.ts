import {
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import { City } from '@data/schema/city';
import { Departure } from '@data/schema/departure';
import {
  select,
  Store
} from '@ngrx/store';
import {
  Observable,
  Subject
} from 'rxjs';
import {
  take,
  takeUntil
} from 'rxjs/operators';
import {
  SearchFormApiActions,
  SearchResultActions
} from '../../state-management/actions';
import * as fromSearch from '../../state-management/reducers';


@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit, OnDestroy {
  departure: City;
  arrival: City;
  outboundDate: string;
  adults: number;
  seniors: number;
  children: number;
  inProgress$: Observable<boolean>;
  departures: Departure[];
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(
    private store: Store<fromSearch.State>,
  ) {
    this.departures = [];
    this.store.pipe(
        select(fromSearch.getSearchFormDataState),
        take(1)
    ).subscribe(data => {
      this.store.dispatch(SearchResultActions.searchDepartures(data));

      this.departure = data.departure;
      this.arrival = data.arrival;
      [this.outboundDate] = data.outboundDate.split('T');
      this.adults = data.adults;
      this.seniors = data.seniors;
      this.children = data.children;
    });
    // this.departures = [
    //   {
    //     "id": "7c5dd26a",
    //     "source_id": 155,
    //     "checkout_type": "new",
    //     "operator_id": "bfc27cd544ca49c18d000f2bc00c58c0",
    //     "origin_location_id": 1942,
    //     "destination_location_id": 1938,
    //     "class": "Economy",
    //     "class_name": "Economy",
    //     "amenities": {
    //       "display_name": "Economy",
    //       "wifi": true,
    //       "toilet": true,
    //       "ac": true,
    //       "food": false,
    //       "refreshment": false,
    //       "power_outlets": true,
    //       "tv": false,
    //       "bus_attendant": false,
    //       "leg_room": false
    //     },
    //     "available_seats": 55,
    //     "prices": {
    //       "total": 5200,
    //       "breakdown": {
    //         "base": 5200
    //       },
    //       "categories": {},
    //       "discounted": false
    //     },
    //     "ticket_types": [
    //       "print"
    //     ],
    //     "departure_timezone": "America/New_York",
    //     "arrival_timezone": "America/Montreal",
    //     "departure_time": "2016-01-14T00:01:00",
    //     "arrival_time": "2016-01-14T07:55:00"
    //   }
    // ];
  }

  ngOnInit() {
    this.inProgress$ = this.store.pipe(select(fromSearch.getSearchLoadingState));
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  onResetClick() {
    this.store.dispatch(SearchFormApiActions.formReset());
  }
}
