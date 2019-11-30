// third-party libraries
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'

// styles
import './index.css';

// components
import App from './App';

// store
import configureStore from './store';

// utils
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <Provider store={configureStore}>
    <App />
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();

