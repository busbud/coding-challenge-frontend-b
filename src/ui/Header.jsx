import React from 'react';

import PropTypes from 'prop-types';

import { languages, currencies } from '../config';

/** Header of the page. */
export default class Header extends React.Component {
  constructor(props) {
    super(props);

    this.onLanguageChange = this.onLanguageChange.bind(this);
    this.onCurrencyChange = this.onCurrencyChange.bind(this);
  }

  /**
   * Get language from event and call parent method
   */
  onLanguageChange(event) {
    const lang = event.target.value;
    const { onLanguageChange } = this.props;
    onLanguageChange(lang);
  }

  /**
   * Get currency from event and call parent method
   */
  onCurrencyChange(event) {
    const curr = event.target.value;
    const { onCurrencyChange } = this.props;
    onCurrencyChange(curr);
  }

  /**
   * Render a select field to set language
   */
  renderLanguageSelect() {
    const { strings } = this.props;
    return (
      <select onChange={this.onLanguageChange} value={strings.getLanguage()} className="lang-select form-control">
        {languages.map(lang => (
          <option
            key={lang.value}
            value={lang.value}
          >
            {lang.display}
          </option>))
        }
      </select>
    );
  }

  /**
   * Render a select field to set currency
   */
  renderCurrencySelect() {
    const { currency } = this.props;
    return (
      <select onChange={this.onCurrencyChange} value={currency} className="curr-select form-control">
        {currencies.map(curr => (
          <option
            key={curr.value}
            value={curr.value}
          >
            {curr.display}
          </option>))
        }
      </select>
    );
  }

  /**
   * Render header
   */
  render() {
    const { strings } = this.props;
    return (
      <div className="header jumbotron">
        <div className="container">
          {this.renderLanguageSelect()}
          {this.renderCurrencySelect()}
          <h1>{strings.welcome}</h1>
          <p>{strings.descr}</p>
          <p>{strings.search}</p>
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  onLanguageChange: PropTypes.func.isRequired,
  onCurrencyChange: PropTypes.func.isRequired,
  currency: PropTypes.string.isRequired,
  strings: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};
