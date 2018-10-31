import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import * as fromDepartures from '../reducers/departure.reducers';

export interface DeparturesState {
  departures: fromDepartures.DepartureState;
}

export const reducers: ActionReducerMap<DeparturesState> = {
  departures: fromDepartures.DepartureReducer,
};

export const getDeparturesState = createFeatureSelector<DeparturesState>('departures');
