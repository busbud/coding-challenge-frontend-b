import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
    Actions,
    createEffect,
    ofType
} from '@ngrx/effects';
import {
    tap
} from 'rxjs/operators';
import { SearchFormApiActions } from '../actions';

@Injectable()
export class SearchFormEffects {
    submitted$ = createEffect(() =>
        this.actions$.pipe(
            ofType(SearchFormApiActions.formSubmitted),
            tap(() => {
                this.router.navigate(['/search/result']);
            })
        ),
        { dispatch: false }
    );

    reset$ = createEffect(() =>
        this.actions$.pipe(
            ofType(SearchFormApiActions.formReset),
            tap(() => {
                this.router.navigate(['/search/form']);
            })
        ),
        { dispatch: false }
    );

    constructor(
        private actions$: Actions,
        private router: Router,
    ) {}
}
