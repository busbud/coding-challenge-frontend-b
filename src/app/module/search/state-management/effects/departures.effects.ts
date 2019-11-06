import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Departure } from '@data/schema/departure';
import { DeparturesService } from '@data/service/departures.service';
import {
    Actions,
    createEffect,
    ofType
} from '@ngrx/effects';
import { of } from 'rxjs';
import {
    catchError,
    map,
    switchMap,
    tap
} from 'rxjs/operators';
import { SearchFormQuery } from '../../page/search-form/models/search-form-query.interface';
import { DeparturesApiActions, SearchResultActions } from '../actions';

@Injectable()
export class DeparturesEffects {
    search$ = createEffect(() =>
        this.actions$.pipe(
            ofType(SearchResultActions.searchDepartures),
            switchMap((data: SearchFormQuery) => {

                return this.departuresService.searchDepartures(data).pipe(
                    map((departures: Departure[]) => DeparturesApiActions.searchSuccess({ departures })),
                    catchError(err =>
                        of(DeparturesApiActions.searchFailure({ error: err.message }))
                    )
                );
            })
        ),
    );

    constructor(
        private actions$: Actions,
        private departuresService: DeparturesService
    ) {}
}
