import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import i18n from 'i18next'

import App from './containers/App'
import DynamicI18nextProvider from './containers/DynamicI18nextProvider'
import { configureStore } from './store/config'
import * as serviceWorker from './serviceWorker'

import fr from './translations/fr.json'
import en from './translations/en.json'

import { GlobalStyle } from './styles'

i18n.init({
  lng: 'en',
  escapeInterpolation: true,
  resources: {
    en: {
      translations: en
    },
    fr: {
      translations: fr
    }
  },
})

const store = configureStore()

ReactDOM.render(
  <Provider store={store}>
    <DynamicI18nextProvider i18n={i18n}>
      <GlobalStyle />
      <App />
    </DynamicI18nextProvider>
  </Provider>,
  document.getElementById('root')
)

// ReactDOM.render(<App />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
