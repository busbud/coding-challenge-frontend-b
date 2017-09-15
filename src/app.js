import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import * as departuresActions from './actions/departuresActions'

import * as Search from './api/search'

import configureStore from './store'
const store = configureStore()
Search.default.initialize().then(function(result){
  store.dispatch(departuresActions.populateDepartures(result))  
})

import App from "./components/App.js";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </ Provider>
  , document.getElementById("app-container")
);
