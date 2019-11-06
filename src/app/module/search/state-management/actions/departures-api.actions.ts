import { Departure } from '@data/schema/departure';
import { createAction, union, props } from '@ngrx/store';

export const searchSuccess = createAction(
    '[Departures/API] Search Success',
    props<{ departures: Departure[] }>()
);

export const searchFailure = createAction(
    '[Departures/API] Search Failure',
    props<{ error: string }>()
);

