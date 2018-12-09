import React from 'react';
import ReactDOM from "react-dom";

import { languages, currencies } from '../config';


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
    this.props.onLanguageChange(lang);
  }

  /**
   * Get currency from event and call parent method
   */
  onCurrencyChange(event) {
    const curr = event.target.value;
    this.props.onCurrencyChange(curr);
  }

  /**
   * Render a select field to set language
   */
  renderLanguageSelect() {
    return (
      <select onChange={this.onLanguageChange} value={this.props.strings.getLanguage()} className="lang-select form-control">
        {languages.map(lang => {
          return (
            <option
              key={lang.value}
              value={lang.value}
            >
              {lang.display}
            </option>
          );
        })}
      </select>
    );
  }

  /**
   * Render a select field to set currency
   */
  renderCurrencySelect() {
    return (
      <select onChange={this.onCurrencyChange} value={this.props.currency} className="curr-select form-control">
        {currencies.map(curr => {
          return (
            <option
              key={curr.value}
              value={curr.value}
            >
              {curr.display}
            </option>
          );
        })}
      </select>
    );
  }

  /**
   * Render departure item
   */
  render() {
    return (
      <div className="header jumbotron">
        <div className="container">
          {this.renderLanguageSelect()}
          {this.renderCurrencySelect()}
          <h1>{this.props.strings.welcome}</h1>
          <p>{this.props.strings.descr}</p>
          <p>{this.props.strings.search}</p>
        </div>
      </div>
    );
  }

}