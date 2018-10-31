import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Departure } from './models/departure.model';
import * as fromDepartures from '../departure/store';

import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-departure',
  templateUrl: './departure.component.html',
  styleUrls: ['./departure.component.scss'],
})
export class DepartureComponent implements OnInit {
  departures$: Observable<Departure[]>;
  loading$: Observable<boolean>;

  constructor(
    private store: Store<fromDepartures.DeparturesState>,
    private translate: TranslateService,
  ) {
    translate.setDefaultLang('en');
  }

  ngOnInit() {
    this.loading$ = this.store.select(fromDepartures.getDeparturesLoaded);
    this.departures$ = this.store.select(fromDepartures.getAllDepartures);
    this.store.dispatch(new fromDepartures.GetDepartures());
  }

  onChange(event): void {
    this.translate.use(event.target.value);
  }
}
