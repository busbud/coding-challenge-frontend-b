/**
 * The global state selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectGlobal = state => state.global || initialState;

const selectRouter = state => state.router;

const makeSelectSearchParams = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.searchParams,
  );

const makeSelectLoading = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.loading,
  );

const makeSelectError = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.error,
  );

const makeSelectDepartures = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.searchResult.departures,
  );

const makeSelectLocation = () =>
  createSelector(
    selectRouter,
    routerState => routerState.location,
  );

export {
  selectGlobal,
  makeSelectSearchParams,
  makeSelectDepartures,
  makeSelectLoading,
  makeSelectError,
  makeSelectLocation,
};
