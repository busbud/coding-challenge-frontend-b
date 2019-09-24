import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App.jsx";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import { createStore } from "redux";

let reducer = (state, action) => {
  if (action.type === "fetch-departures-done") {
    return { ...state, busResults: action.busResults };
  }
  if (action.type === "change-lng") {
    return { ...state, language: action.language };
  }
  if (action.type === "clear-search") {
    return { ...state, busResults: {} };
  }
  return state;
};

const store = createStore(
  reducer,
  { busResults: {}, language: "En" },
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
