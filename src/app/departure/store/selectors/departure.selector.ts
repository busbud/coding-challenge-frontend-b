import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromDepartures from '../reducers/departure.reducers';

export const getDepartureState = createSelector(
  fromFeature.getDeparturesState,
  (state: fromFeature.DeparturesState) => state.departures,
);

export const getAllDepartures = createSelector(getDepartureState, fromDepartures.getDepartures);

export const getDeparturesLoading = createSelector(
  getDepartureState,
  fromDepartures.getDeparturesLoaded,
);
export const getDeparturesLoaded = createSelector(
  getDepartureState,
  fromDepartures.getDeparturesLoading,
);
