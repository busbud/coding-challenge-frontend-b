import React from "react";
import { withRouter } from "react-router-dom";

import LanguageSelect from "../components/LanguageSelect";

class HeaderContainer extends React.Component {
  onClick = () => {
    this.props.history.push("/");
  };

  render() {
    const {
      location: { pathname }
    } = this.props;
    return (
      <div className="top-bar-container">
        {pathname !== "/" && (
          <div onClick={this.onClick}>
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

export default withRouter(HeaderContainer);
