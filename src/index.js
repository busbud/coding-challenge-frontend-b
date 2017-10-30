import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import 'semantic-ui-css/semantic.min.css';
import './index.css';
import tripsToOsheaga from './reducers';
import { epicMiddleware } from './epics/index';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import MissingEnvironmentVariable from './MissingEnvironmentVariable/MissingEnvironmentVariable';

const store = createStore(tripsToOsheaga, applyMiddleware(epicMiddleware));

let app = <App />;

const DEFAULT_API_TOKEN = 'SET-THIS-SUPER-TOKEN-TO-RETRIEVE-TRIPS';
if (process.env.REACT_APP_BUSBUD_API_TOKEN === DEFAULT_API_TOKEN) {
  app = <MissingEnvironmentVariable />;
}

ReactDOM.render(
  <Provider store={store}>{app}</Provider>,
  document.getElementById('root')
);
registerServiceWorker();
