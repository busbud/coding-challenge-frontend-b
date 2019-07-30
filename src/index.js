import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { loadTranslations, setLocale, syncTranslationWithStore } from 'react-redux-i18n';

import App from './components/App';
import store from './store/configureStore';
import translationsObject from './utils/translationObject';

import './stylesheets/main.scss';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';

console.log(translationsObject);

syncTranslationWithStore(store);
store.dispatch(loadTranslations(translationsObject));
store.dispatch(setLocale('en'));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, document.getElementById('root'),
);
