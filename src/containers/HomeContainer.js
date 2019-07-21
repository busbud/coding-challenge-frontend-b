import React from "react";
import { withNamespaces } from "react-i18next";

@withNamespaces()
export default class HomeContainer extends React.Component {
  render() {
    const { t, onClick } = this.props;
    return (
      <div className="home-page-container">
        <div className="page-header">
          <div className="page-header__icon" />
          <div className="page-header__tagline">
            {t("Excited for an upcoming weekend at Osheaga?")}
          </div>
          <h1>{t("NYC to MTL")}</h1>
          <div className="button" onClick={onClick}>
            {t("Search")}
          </div>
        </div>
      </div>
    );
  }
}