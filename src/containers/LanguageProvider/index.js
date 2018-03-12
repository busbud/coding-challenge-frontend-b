import React from 'react';
import { string, object, element } from 'prop-types';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { IntlProvider } from 'react-intl';

import { makeSelectLocale } from './selectors';

const propTypes = {
  locale: string,
  messages: object,
  children: element.isRequired,
};

export class LanguageProvider extends React.PureComponent {
  static propTypes = propTypes;
  // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <IntlProvider
        locale={this.props.locale}
        key={this.props.locale}
        messages={this.props.messages[this.props.locale]}
      >
        {React.Children.only(this.props.children)}
      </IntlProvider>
    );
  }
}

const mapStateToProps = createSelector(makeSelectLocale(), locale => ({ locale }));

export default connect(mapStateToProps)(LanguageProvider);
