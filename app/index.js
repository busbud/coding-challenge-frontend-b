import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { createStore } from 'redux'
import { search } from './reducers/search'

const store = createStore(
  search,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)


ReactDOM.render(<App store={store}/>, document.getElementById('app'))

if (module.hot) {
  module.hot.accept()
}