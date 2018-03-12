import { createSelector } from 'reselect';
import { map, compose, flip, prop, curry, propOr, assoc, converge, identity, pathOr } from 'ramda';
import { findById, safeArray } from '../../utils/helpers';

const flippedFindById = flip(findById);

const merge = curry((fromKey, fromObject, toKey, toObject) =>
  converge(assoc(toKey), [compose(flippedFindById(fromObject), prop(fromKey)), identity])(toObject),
);

export const selectGlobal = prop('global');

export const makeSelectFetchingState = () => createSelector(selectGlobal, prop('isFetching'));

export const makeSelectError = () => createSelector(selectGlobal, prop('hasError'));

export const makeSelectQuery = () => createSelector(selectGlobal, prop('query'));

export const makeSelectOutboundDate = () =>
  createSelector(makeSelectQuery(), pathOr('1970-01-01', ['path', 'outbound_date']));

export const makeSelectXDepartures = () => createSelector(selectGlobal, propOr({}, 'xDepartures'));

export const makeSelectCities = () => createSelector(makeSelectXDepartures(), propOr([], 'cities'));

export const makeSelectDepartures = () => createSelector(makeSelectXDepartures(), propOr([], 'departures'));

export const makeSelectOperators = () => createSelector(makeSelectXDepartures(), propOr([], 'operators'));

export const makeSelectLocations = () => createSelector(makeSelectXDepartures(), propOr([], 'locations'));

export const makeSelectComplete = () => createSelector(makeSelectXDepartures(), propOr(false, 'complete'));

export const makeSelectStructuredDepartures = () =>
  createSelector(
    makeSelectDepartures(),
    makeSelectOperators(),
    makeSelectLocations(),
    (departures, operators, locations) => {
      const enhancer = compose(
        merge('origin_location_id', locations, 'origin_location'),
        merge('destination_location_id', locations, 'destination_location'),
        merge('operator_id', operators, 'operator'),
      );

      return map(enhancer, safeArray(departures));
    },
  );
