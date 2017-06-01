import React from 'react';
import { render } from 'react-dom';
import AppContainer from './containers/AppContainer';
import './index.css';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const logger = createLogger();
const store = createStore(
  rootReducer,
  applyMiddleware(thunk, logger)
);

render(
  <Provider store={store}>
    <AppContainer />
  </Provider>,
  document.getElementById('root')
);
