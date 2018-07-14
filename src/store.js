import thunk from 'redux-thunk';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import reducers from './reducers';

export default createStore(
  combineReducers(reducers),
  compose(applyMiddleware(thunk), window.devToolsExtension ? window.devToolsExtension() : f => f),
);
