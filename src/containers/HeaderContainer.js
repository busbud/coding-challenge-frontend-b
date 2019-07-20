import React from "react";

import LanguageSelect from "../components/LanguageSelect";

export default class HeaderContainer extends React.Component {
  onClickBack = () => {
    this.props.history.goBack();
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
        <div className="language">
          <LanguageSelect />
        </div>
      </div>
    );
  }
}
