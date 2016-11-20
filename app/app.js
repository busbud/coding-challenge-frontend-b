import ReactDOM from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import AppContainer from './containers/AppContainer';
import configureStore from './store';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <AppContainer name='World' />
  </Provider>,
  document.getElementById('app')
);
