import React from "react";

import {
  changeLanguage,
  currentLanguageDisplay
} from "../services/language-service";

export default class HeaderContainer extends React.Component {
  onClickBack = () => {
    this.props.history.goBack();
  };

  onClick = event => {
    event.preventDefault();
    changeLanguage();
    window.location.reload();
  };

  render() {
    const {
      location: { pathname }
    } = this.props;

    return (
      <div className="top-bar-container">
        {pathname !== "/" && (
          <div onClick={this.onClickBack}>
            <i className="fa fa-angle-left" />
          </div>
        )}
        <div className="language" onClick={this.onClick}>
          {currentLanguageDisplay()}
        </div>
      </div>
    );
  }
}
