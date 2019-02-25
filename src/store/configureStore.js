import { createStore, applyMiddleware } from 'redux';
import { rootReducer } from '../reducers';
import { api } from '../middleware/api';

export const configureStore = initialState => {
  const store = createStore(rootReducer, initialState, applyMiddleware(api));

  if (module.hot) {
    module.hot.accept('../reducers', () =>
      store.replaceReducer(require('../reducers'))
    );
  }

  return store;
};
