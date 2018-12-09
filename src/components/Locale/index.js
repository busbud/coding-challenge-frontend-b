import React from 'react'
import { connect } from 'react-redux'

import * as localesSelectors from '../../store/services/locales/selectors'

import Container from '../Container'

import {
  StyledLocale,
} from './styles'

const Locale = (props) => (
  <StyledLocale>
    <Container>
      <select
        onChange={props.changeLocale}
        value={props.lang}>
        {props.locales.map(locale => (
          <option key={locale.lang} value={locale.lang}>{locale.lang.toUpperCase()} - {locale.currency}</option>
        ))}
      </select>
    </Container>
  </StyledLocale>
)

const mapStateToProps = state => {
  return {
    lang: localesSelectors.getLang(state),
  }
}

export default connect(mapStateToProps)(Locale)