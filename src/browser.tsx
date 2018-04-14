import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import App from './app/app';
import SearchStore from './app/store/search';


ReactDOM.hydrate(
  <Provider store={SearchStore}>
    <App />
  </Provider>, 
  document.getElementById('app')
);