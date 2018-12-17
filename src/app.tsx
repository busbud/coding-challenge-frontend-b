import { render } from 'react-dom'
import * as React from 'react'
import './css/application.sass'
import SearchWrapper from './components/SearchWrapper'

render(
  <SearchWrapper></SearchWrapper>,
  document.getElementById('app')
)