import { combineEpics, createEpicMiddleware } from 'redux-observable';
import { ajax } from 'rxjs/observable/dom/ajax';
import fetchTripsEpic from './fetchTripsEpic';
import pollTripsEpic from './pollTripsEpic';
import shouldPollTripsEpic from './shouldPollTripsEpic';

export const tripsToOsheagaEpic = combineEpics(
  fetchTripsEpic,
  pollTripsEpic,
  shouldPollTripsEpic
);

export const epicMiddleware = createEpicMiddleware(tripsToOsheagaEpic, {
  dependencies: { ajax: ajax }
});
