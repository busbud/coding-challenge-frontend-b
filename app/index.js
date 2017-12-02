import React                                     from 'react'
import { render }                                from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider }                              from 'react-redux'
import rootReducer                               from './store/reducers'
import thunk                                     from 'redux-thunk'
import apiFetcher                                from './store/middlewares/api_fetcher'
import I18n                                      from 'redux-i18n'
import App                                       from './components/app'

const store = createStore(rootReducer, {}, applyMiddleware(thunk, apiFetcher))
// Default translations 
const translations = window.config.translations
const language = window.config.locale

render(
  <Provider store={store}>
    <I18n translations={translations} initialLang={language} useReducer={true}>
      <App />
    </I18n>
  </Provider>,
  document.getElementById('root')
)