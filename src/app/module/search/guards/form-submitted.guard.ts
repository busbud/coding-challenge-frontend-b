import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivate,
    Router
} from '@angular/router';
import {
    select,
    Store
} from '@ngrx/store';
import {
    Observable,
    of
} from 'rxjs';
import {
    catchError,
    filter,
    switchMap,
    take
} from 'rxjs/operators';

import * as fromSearch from '../state-management/reducers';

@Injectable({
    providedIn: 'root',
})
export class FormSubmittedGuard implements CanActivate {
    constructor(
        private store: Store<fromSearch.State>,
        private router: Router
    ) {
    }

    canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
        return this.isFormSubmitted();
    }

    isFormSubmitted(): Observable<boolean> {
        return this.store.pipe(
            select(fromSearch.getSearchFormSubmittedState),
            switchMap(submitted => {
                if (submitted) {
                    return of(submitted);
                }

                throw new Error('Form not submitted!');
            }),
            catchError(() => {
                this.router.navigate(['/search/form']);

                return of(false);
            })
        );
    }
}
