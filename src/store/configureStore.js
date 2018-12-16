import { composeWithDevTools } from 'redux-devtools-extension';

import { createStore, applyMiddleware } from 'redux';

import createSagaMiddleware from 'redux-saga';

import rootSaga from '../sagas';

import rootReducer from '../reducers';

export default function configureStore() {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [sagaMiddleware];

  const middlewareEnhancer = applyMiddleware(...middlewares);

  const composedEnhancer = composeWithDevTools(...[middlewareEnhancer]);

  const store = createStore(rootReducer, composedEnhancer);

  sagaMiddleware.run(rootSaga);

  return store;
}
