import React from 'react';
import ReactDOM from "react-dom";

import { languages } from '../config';


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
   * Render departure item
   */
  render() {
    return (
      <div className="header jumbotron">
        <div className="container">
          {this.renderLanguageSelect()}
          <h1>{this.props.strings.welcome}</h1>
          <p>{this.props.strings.descr}</p>
          <p>{this.props.strings.search}</p>
        </div>
      </div>
    );
  }

}