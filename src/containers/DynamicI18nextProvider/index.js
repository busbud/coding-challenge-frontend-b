import React, { Component } from 'react'
import { I18nextProvider } from 'react-i18next'
import { connect } from 'react-redux'
import numeral from 'numeral'
import moment from 'moment'
import 'numeral/locales'
import 'moment/locale/fr-ca.js'

import * as localesSelectors from '../../store/services/locales/selectors'

class DynamicI18nextProvider extends Component {
  constructor(props) {
    super(props)

    if (props.lang) {
      moment.locale(props.lang)
      numeral.locale(props.lang)
    }
  }

  componentWillReceiveProps(nextProps) {
    const { lang, i18n } = this.props

    if (nextProps.lang !== lang) {
      if (nextProps.lang === 'fr') {
        i18n.changeLanguage('fr-ca', () => {
          moment.locale('fr-ca')
          numeral.locale('fr-ca')
        })
      } else {
        i18n.changeLanguage(nextProps.lang, () => {
          moment.locale(nextProps.lang)
          numeral.locale(nextProps.lang)
        })
      }
    }
  }

  render() {
    const { children, i18n } = this.props

    return (
      <I18nextProvider i18n={i18n}>
        {children}
      </I18nextProvider>
    )
  }
}

const mapStateToProps = state => {
  return {
    lang: localesSelectors.getLang(state),
  }
}

export default connect(mapStateToProps)(DynamicI18nextProvider)
