// third-party libraries
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";

// styles
import './index.css';

// components
import App from './App';

// store
import configureStore from './store';

// utils
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <I18nextProvider i18n={i18n}>
    <Provider store={configureStore}>
      <App />
    </Provider>
  </I18nextProvider >,
  document.getElementById('root')
);
registerServiceWorker();

