import { applyMiddleware, createStore, Store } from "redux";
import { getReducers } from "./reducers/main";
import thunk from "redux-thunk";

export const configureStore = (): Store => {
  return createStore(getReducers(), applyMiddleware(thunk));
};
