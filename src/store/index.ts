import { configureStore } from '@reduxjs/toolkit'

import rootReducer from './rootReducer'

export type State = ReturnType<typeof rootReducer>

const configureAppStore = (preloadedState?: any) => {
  const store = configureStore({
    reducer: rootReducer,
    preloadedState,
    devTools: {
      name: 'Busbud Challenge',
    },
  })

  if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('./rootReducer', () => store.replaceReducer(rootReducer))
  }

  return store
}

export default configureAppStore
