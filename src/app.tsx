import { render } from 'react-dom'
import * as React from 'react'
import './css/application.sass'
import SearchWrapper from './components/SearchWrapper'
import { I18nextProvider } from 'react-i18next'
import i18n from './utils/i18n'

render(
  <I18nextProvider i18n={i18n}>
    <SearchWrapper></SearchWrapper>
  </I18nextProvider>,
  document.getElementById('app')
)
