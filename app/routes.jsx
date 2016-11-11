import React from 'react'
import { Route, IndexRoute } from 'react-router'
import Layout from './components/layout.jsx';
import IndexPage from './components/index.jsx';

const routes = (
  <Route path="/" component={Layout}>
    <IndexRoute component={IndexPage}/>
  </Route>
);

export default routes;
