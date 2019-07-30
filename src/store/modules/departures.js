import { toastr } from 'react-redux-toastr';
import { I18n } from 'react-redux-i18n';

import localeSelector from './i18nSelectors';
import { getDeparturesSearchRequest } from '../../utils/apiUtilities';

// Action Types
const LOADING = 'departure/LOADING';
const DEPARTURES = 'departure/DEPARTURES';
const COMPLETE = 'departure/COMPLETE';

// Selectors
export const departuresSelector = state => state.departures.list;
export const indexSelector = state => state.departures.list.length;
export const isLoadingSelector = state => state.departures.isLoading;
export const isCompleteSelector = state => state.departures.isComplete;
export const filtersSelector = state => state.departures.filters;

// Actions
export function isLoadingAction(isLoading) {
  return {
    type: LOADING,
    payload: (typeof isLoading === 'undefined') ? false : isLoading,
  };
}

export function isCompleteAction(isComplete) {
  return {
    type: COMPLETE,
    payload: (typeof isComplete === 'undefined') ? false : isComplete,
  };
}

export function setDeparturesAction(departures) {
  return {
    type: DEPARTURES,
    payload: departures,
  };
}

const errorLoadingDepartures = (error, dispatch) => {
  const errorMessage = I18n.t('api.errorMessage');
  toastr.error('Error', errorMessage);
  console.log(errorMessage, error);
  dispatch([
    setDeparturesAction([]),
    isCompleteAction(true),
    isLoadingAction(false),
  ]);
};

export function pollDepartures() {
  return (dispatch, getState) => {
    dispatch(isLoadingAction(true));
    const store = getState();
    const locale = localeSelector(store);
    const filters = filtersSelector(store);
    const index = indexSelector(store);

    console.log('will poll departures');

    getDeparturesSearchRequest({
      filters,
      poll: true,
      locale,
      index,
    }).then((response) => {
      console.log('did poll departures', response.data);

      const departures = departuresSelector(store);
      dispatch([
        setDeparturesAction(departures.concat(response.data.departures)),
        isCompleteAction(response.data.complete),
        isLoadingAction(false),
      ]);
    }).catch((error) => {
      errorLoadingDepartures(error, dispatch);
    });
  };
}

export function initDepartures() {
  return (dispatch, getState) => {
    dispatch(isLoadingAction(true));
    const store = getState();
    const locale = localeSelector(store);
    const filters = filtersSelector(store);

    console.log('will load departures');


    getDeparturesSearchRequest({
      filters,
      poll: false,
      locale,
    }).then((response) => {
      console.log('did load departures', response.data);

      dispatch([
        setDeparturesAction(response.data.departures),
        isCompleteAction(response.data.complete),
        isLoadingAction(false),
      ]);
    }).catch((error) => {
      errorLoadingDepartures(error, dispatch);
    });
  };
}

// Reducers
const INITIAL_STATE = {
  isLoading: false,
  list: [],
  isComplete: false,
  filters: {
    origin: 'dr5reg',
    destination: 'f25dvk',
    outboundDate: '2019-08-02',
    adult: 1,
    child: 0,
    senior: 0,
  },
};

export default function reducer(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case DEPARTURES:
      return { ...state, list: action.payload };
    case LOADING:
      return { ...state, isLoading: action.payload };
    case COMPLETE:
      return { ...state, isComplete: action.payload };
    default:
      return state;
  }
}
