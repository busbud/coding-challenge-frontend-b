import { createStore, applyMiddleware } from 'redux';
import promise from 'redux-promise';
import multi from 'redux-multi';
import thunk from 'redux-thunk';

import rootReducer from './rootReducer';

let store; // eslint-disable-line import/no-mutable-exports

const configureStore = (initialState) => {
  store = createStore(rootReducer, initialState, applyMiddleware(thunk, multi, promise));
  return store;
};

export { configureStore, store };
