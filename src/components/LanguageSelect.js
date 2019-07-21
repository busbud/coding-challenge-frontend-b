import React from "react";

import {
  getCurrentLanguage,
  changeLanguage
} from "../services/language-service";
import languages from "../languageList";

export default class LanguageSelect extends React.Component {
  state = {
    currentLanguage: getCurrentLanguage()
  };

  onChange = event => {
    const { value } = event.target;
    changeLanguage(value);
    window.location.reload();
    this.setState({ currentLanguage: value });
  };

  render() {
    const { currentLanguage } = this.state;
    return (
      <select
        className="select"
        onChange={this.onChange}
        value={currentLanguage}
      >
        {_.map(languages, language => {
          return (
            <option value={language} key={language}>
              {language.toUpperCase()}
            </option>
          );
        })}
      </select>
    );
  }
}
