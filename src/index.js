import React from 'react';
import ReactDOM from 'react-dom';
import {
  HashRouter,
  Route
} from 'react-router-dom';

import App from './components/App';
import './index.css';

ReactDOM.render((
  <HashRouter>
    <div>
      <Route exact path="/" component={App} />
    </div>
  </HashRouter>
  ), document.getElementById('root')
);
