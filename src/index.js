import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {I18nextProvider} from 'react-i18next';

import 'bulma/css/bulma.min.css';
import 'font-awesome/css/font-awesome.min.css';

import App from './App';
import store from './store';
import registerServiceWorker from './registerServiceWorker';

import i18n from './utils/i18n.js';

ReactDOM.render(
  <Provider store={store}>
    <I18nextProvider i18n={i18n}>
      <App />
    </I18nextProvider>
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
