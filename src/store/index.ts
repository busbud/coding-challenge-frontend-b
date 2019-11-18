import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import sagas from '../sagas';
import rootReducer from './rootReducer';

const sagaMiddleware = createSagaMiddleware();

export type AppState = ReturnType<typeof rootReducer>;

export default function configureStore(initialState = {}) {
  const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(sagaMiddleware))
  );

  sagaMiddleware.run(sagas);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./rootReducer', () => {
      // eslint-disable-next-line global-require
      const nextRootReducer = require('./rootReducer').default;
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
