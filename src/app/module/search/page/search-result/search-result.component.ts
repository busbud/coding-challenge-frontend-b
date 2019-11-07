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
    take
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
  inProgress$: Observable<boolean>;
  departures$: Observable<Departure[]>;
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(
    private store: Store<fromSearch.State>
  ) {
    this.departures$ = this.store.pipe(select(fromSearch.selectAllDepartures));
    this.store.pipe(
        select(fromSearch.getSearchFormDataState),
        take(1)
    ).subscribe(data => {
      this.store.dispatch(SearchResultActions.searchDepartures(data));

      this.departure = data.departure;
      this.arrival = data.arrival;
      [this.outboundDate] = data.outboundDate.split('T');
      this.adults = data.adults;
    });
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
