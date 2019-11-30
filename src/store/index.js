// third-party libraries
import { applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';

// reducers
import reducers from '../reducers/rootReducer';

const middleware = [thunk];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // eslint-disable-line

const configureStore = composeEnhancers(
  applyMiddleware(...middleware)
)(createStore);

export default configureStore(reducers);
