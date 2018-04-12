import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import App from './app/app';
import SearchStore from './app/store/search';

const initialData = JSON.parse(document.getElementById('initial-data').getAttribute('data-json'));

ReactDOM.hydrate(
  <Provider store={SearchStore}>
    <App />
  </Provider>, 
  document.getElementById('app')
);