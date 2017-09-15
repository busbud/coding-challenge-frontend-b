import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import * as departuresActions from './actions/departuresActions'

import initialState from './reducers/initialState';

import configureStore from './store'
const store = configureStore()

store.dispatch(departuresActions.populateDepartures(initialState.departures))

import App from "./components/App.js";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </ Provider>
  , document.getElementById("app-container")
);
