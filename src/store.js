import { createStore } from "redux";
import reducer from "./reducers/reducer";

let initialState = {
  origin: "dr5reg",
  destination: "f25dvk",
  date: "2020-08-02", //new Date(2020, 7, 2).toISOString(),
  results: undefined,
  departures: [],
  pollstop: true,
  query: ""
};

const store = createStore(
  reducer,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
