import React from 'react'
import { IntlProvider } from 'react-intl'
import { connect } from 'react-redux'
import numeral from 'numeral'
import moment from 'moment'
import 'numeral/locales'
import 'moment/locale/fr.js';
import messages from 'locales'

class DynamicIntlProvider extends React.Component {
  constructor(props) {
    super(props);

    if (props.lang) {
      numeral.locale(props.lang);
      moment.locale(props.lang);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.lang !== this.props.lang) {
      if (nextProps.lang === 'fr') {
        numeral.locale('fr-ca');
      }
      moment.locale(nextProps.lang);
    }
  }

  render() {
    const { lang, children } = this.props;

    return (
      <IntlProvider locale={lang} messages={messages[lang]} textComponent={React.Fragment}>
        {children}
      </IntlProvider>
    )
  }
}

export default connect(state => ({ lang: state.locale.lang }))(DynamicIntlProvider);
