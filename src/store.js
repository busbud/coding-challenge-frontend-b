import { createStore, compose } from 'redux';
import { install } from 'redux-loop';
import rootReducer from './reducers/index';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const initialState = {
  tripInformation: {
    locations: [],
    departures: [],
    operators: [],
  },
  metadata: {
    searchParams: {
      adult: 1,
      child: 0,
      senior: 0,
      lang: 'US',
      currency: 'USD',
    },
    searchStatus: 'uninitiated',
    departureCount: 0,
  },
};

const store = createStore(rootReducer, initialState, composeEnhancers(install()));

export default store;
