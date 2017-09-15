import { applyMiddleware, createStore } from "redux";

import logger from "redux-logger";
import promise from "redux-promise-middleware";
import thunk from "redux-thunk";

import rootReducer from "./reducers/rootReducer";

const middleware = applyMiddleware(promise(), thunk, logger());


console.log(rootReducer)

export default createStore(rootReducer, middleware);
