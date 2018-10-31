import { Injectable } from '@angular/core';

import { Effect, Actions } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';

import { DepartureService } from '../../services';
import { LOAD_DEPARTURES, GetDeparturesSuccess, GetDeparturesFail } from '../actions';

@Injectable()
export class DeparturesEffect {
  constructor(private actions$: Actions, private departureService: DepartureService) {}

  @Effect()
  loadDepartures$ = this.actions$.ofType(LOAD_DEPARTURES).pipe(
    switchMap(() => {
      return this.departureService.getDepartures().pipe(
        map(departures => new GetDeparturesSuccess(departures)),
        catchError(error => of(new GetDeparturesFail(error))),
      );
    }),
  );
}
