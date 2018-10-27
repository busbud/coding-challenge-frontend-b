import { applyMiddleware, compose, createStore } from 'redux'
import reducers from './reducers'
import thunk from 'redux-thunk'

export default (initialState = {}) => {
  let composeEnhancers = compose
  const middleware = [thunk]

  if (process.env.NODE_ENV !== 'production') {
    const composeWithDevToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    if (typeof composeWithDevToolsExtension === 'function') {
      composeEnhancers = composeWithDevToolsExtension
    }
  }

  const store = createStore(
    reducers,
    initialState,
    composeEnhancers(
      applyMiddleware(...middleware)
    )
  )

  return store
}
