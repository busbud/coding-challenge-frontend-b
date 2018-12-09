import { Map } from 'immutable'
import { applyMiddleware, compose, createStore } from 'redux'
import { combineReducers } from 'redux-immutablejs'
import promiseMiddleware from 'redux-promise'
import thunk from 'redux-thunk'
import * as reducers from './reducers'

const enhancers = [
  applyMiddleware(
    thunk,
    promiseMiddleware
  )
]

if (process.env.NODE_ENV !== 'production' && window.__REDUX_DEVTOOLS_EXTENSION__) {
  enhancers.push(window.__REDUX_DEVTOOLS_EXTENSION__())
}

export const configureStore = (appReducers) => createStore(combineReducers({
  ...reducers,
  ...(appReducers || []),
}), Map({}), compose(...enhancers))
