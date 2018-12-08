import React from 'react';
import ReactDOM from "react-dom";

import LocalizedStrings from 'react-localization';

import Header from './Header';
import SearchTrigger from './SearchTrigger';


/** Main component that display web page. */
export default class Onboarding extends React.Component {

  constructor(props) {
    super(props);

    const strings = new LocalizedStrings({
      en: {
        welcome: "Welcome !",
      },
      fr: {
        welcome: "Bienvenu !"
      }
    });

    this.state = {
      lang: strings.getLanguage(),
      strings
    };
    this.onLanguageChange = this.onLanguageChange.bind(this);
  }

  /**
   * Update language in state
   */
  onLanguageChange(lang) {
    this.state.strings.setLanguage(lang);
    this.setState({
      strings: this.state.strings,
      lang
    });
  }

  /**
   * Render departure item
   */
  render() {
    return (
      <div className="container">
        <Header 
          strings={this.state.strings}
          onLanguageChange={this.onLanguageChange}
        />
        <SearchTrigger
          lang={this.state.lang}
        />
      </div>
    );
  }

}