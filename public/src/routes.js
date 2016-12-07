import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/app';
import Home from './components/home';
import Departures from './components/departures';

export default (
  <Route path='/' component={App}>
    <IndexRoute component={Home} />
    <Route path='departures' component={Departures} />
  </Route>
);