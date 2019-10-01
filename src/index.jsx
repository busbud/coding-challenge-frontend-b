import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App.jsx";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import { createStore } from "redux";

let reducer = (state, action) => {
  if (action.type === "fetch-departures-done") {
    return {
      ...state,
      departures: action.departures,
      operators: action.operators
    };
  }
  if (action.type === "change-lng") {
    return { ...state, language: action.language };
  }
  if (action.type === "clear-search") {
    return {
      ...state,
      departures: [],
      operators: [],
      origin: "",
      destination: "",
      outbound_date: "",
      passengers: "",
      travel_type: ""
    };
  }
  if (action.type === "go-back-to-previous-page") {
    return { ...state, page: action.page };
  }
  if (action.type === "go-to-next-page") {
    return { ...state, page: action.page };
  }
  if (action.type === "selected-origin") {
    return { ...state, origin: action.origin };
  }
  if (action.type === "selected-destination") {
    return { ...state, destination: action.destination };
  }
  if (action.type === "selected-outbound_date") {
    return { ...state, outbound_date: action.outbound_date };
  }
  if (action.type === "selected-passengers") {
    return { ...state, passengers: action.passengers };
  }
  if (action.type === "selected-travel_type") {
    return { ...state, travelType: action.travelType };
  }
  return state;
};

const store = createStore(
  reducer,
  {
    departures: [],
    operators: [],
    language: "En",
    page: 0,
    origin: "",
    destination: "",
    outbound_date: "",
    passengers: "",
    travelType: ""
  },
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
