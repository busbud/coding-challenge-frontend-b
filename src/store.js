import { createStore, compose } from 'redux';
import { install } from 'redux-loop';
import rootReducer from './reducers/index';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const initialState = {
  metadata: {
    searchParams: {
      adult: 1,
      child: 0,
      senior: 0,
      lang: 'US',
      currency: 'USD',
    },
    departureCount: 0,
  },
};

const store = createStore(rootReducer, initialState, composeEnhancers(install()));

export default store;
