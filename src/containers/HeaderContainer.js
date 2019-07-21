import React from "react";

import LanguageSelect from "../components/LanguageSelect";

export default class HeaderContainer extends React.Component {
  render() {
    const { onClick, displayDepartures } = this.props;

    return (
      <div className="top-bar-container">
        {displayDepartures && (
          <div onClick={onClick}>
            <i className="fa fa-angle-left" />
          </div>
        )}
        <div className="language">
          <LanguageSelect />
        </div>
      </div>
    );
  }
}
