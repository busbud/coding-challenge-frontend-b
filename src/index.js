import 'whatwg-fetch';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';

import './i18n';
import store, { history } from './store';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Switch>
        <Redirect exact from="/" to="/en-ca" />
        <Route path="/:lang" component={App} />
      </Switch>
    </ConnectedRouter>
  </Provider>,
document.getElementById('root'));
registerServiceWorker();
