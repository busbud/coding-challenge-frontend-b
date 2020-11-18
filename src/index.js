import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware,combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { BrowserRouter } from 'react-router-dom';
import { routerReducer } from 'react-router-redux';
import { loadTranslations, setLocale, syncTranslationWithStore, i18nReducer,
} from 'react-redux-i18n';

import { Provider } from 'react-redux';
import registerServiceWorker from './registerServiceWorker';

import DefaultLayout from './DefaultLayout';

import { getLanguagesReducer } from './reducers/common/languagesRdc';

import './index.css';

import MasterApp from './components/Master/MasterApp';

import French from './locales/fr.json';
import English from './locales/en.json';


const store = createStore(combineReducers({
  getLanguagesReducer,
  routing: routerReducer,
  i18n: i18nReducer,
}),
applyMiddleware(thunk));


const locales = {
  en: English,
  fr: French
};

syncTranslationWithStore(store);
store.dispatch(loadTranslations(locales));
store.dispatch(setLocale('en'));


ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <DefaultLayout exact path="/" component={() => <MasterApp product="bus" />} />
      </div>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);
registerServiceWorker();
