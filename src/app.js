import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import * as departuresActions from './actions/departuresActions'
import * as localesActions from './actions/localesActions'
import initialState from './reducers/initialState';
import App from "./components/App.js";
import configureStore from './store'

import { initialize, addTranslation } from 'react-localize-redux';
import localesJson from './locales/locales.json'
const languages = ['fr', 'en']

const store = configureStore()

store.dispatch(initialize(languages, { defaultLanguage: 'fr' }))
store.dispatch(addTranslation(localesJson))
store.dispatch(departuresActions.populateDepartures(initialState.departures))

ReactDOM.render(
  <Provider store={store}>
    <App />
    </ Provider>
    , document.getElementById("app-container")
  );
