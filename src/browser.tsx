import { Provider } from 'mobx-react';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './app/app';
import SearchStore from './app/store/search';
import './i18n';

ReactDOM.hydrate(
  <Provider store={SearchStore}>
    <App />
  </Provider>, 
  document.getElementById('app')
);