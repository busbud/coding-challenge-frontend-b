import 'whatwg-fetch';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import store, { history } from './store';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

// store.subscribe(() => {
//   console.log(store.getState());
// });

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
