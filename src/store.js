import { applyMiddleware, createStore, compose } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import promise from "redux-promise-middleware";

import rootReducer from "./reducers/rootReducer";

const createStoreWithMiddleware = compose(
  applyMiddleware(promise(), thunk, logger()),
  window.devToolsExtension ? window.devToolsExtension() : f => f
)(createStore)

export default function configureStore(initialState) {
  return createStoreWithMiddleware(rootReducer, initialState)
}
