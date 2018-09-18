import React, { Component } from "react";
import logo                 from "../img/osheaga-logo.png";
import { translate }        from "react-i18next";

class Header extends Component {
  render() {
    const { t } = this.props;
    return (
      <header className="header">
        <div className="w-100 flex align-items-center justify-center flex-wrap">
          <img className="logo" src={logo} alt={t("logo-alt")}/>
        </div>
      </header>
    );
  }
}

export default translate("common")(Header);