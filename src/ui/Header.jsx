import React from 'react';
import ReactDOM from "react-dom";

import LocalizedStrings from 'react-localization';

import { languages } from '../config';
import SearchTrigger from './SearchTrigger';


/** Header of the page. */
export default class Header extends React.Component {

  constructor(props) {
    super(props);

    this.onLanguageChange = this.onLanguageChange.bind(this);
  }

  /**
   * Get language from event and call parent method
   */
  onLanguageChange(event) {
    const lang = event.target.value;
    this.props.onLanguageChange(lang);
  }

  /**
   * Render departure item
   */
  render() {
    return (
      <div className="header">
        <h1>{this.props.strings.welcome}</h1>
        <select onChange={this.onLanguageChange} value={this.props.strings.getLanguage()}>
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
      </div>
    );
  }

}