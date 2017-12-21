import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import createHistory from 'history/createBrowserHistory';
import rootReducer from './modules';
import dataService from './modules/dataService';

export const history = createHistory();

const initialState = {};
const middleware = [
  thunk,
  routerMiddleware(history),
  dataService
];

const composedEnhancers = compose(
  applyMiddleware(...middleware)
);

const store = createStore(
  rootReducer,
  initialState,
  composedEnhancers
);

export default store;
