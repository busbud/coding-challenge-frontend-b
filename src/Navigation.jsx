import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { t } from "./Translations.jsx";
import "./style/NavBar.css";
import "./style/Departures.css";

class UnconnectedNavigation extends Component {
  changeLngFr = () => {
    this.props.dispatch({
      type: "change-lng",
      language: "Fr"
    });
  };
  changeLngEn = () => {
    this.props.dispatch({
      type: "change-lng",
      language: "En"
    });
  };
  render = () => {
    let lng = this.props.language;
    return (
      <div>
        <div className="header">
          <h2>{lng === "Fr" ? t("Departures") : "Departures"}</h2>
          <div>
            <button id="lng-button" onClick={this.changeLngFr}>
              Fr
            </button>
            <button id="lng-button" onClick={this.changeLngEn}>
              En
            </button>
          </div>
        </div>
        <div className="footer">
          {lng === "Fr"
            ? t("Travel the world & protect the environment")
            : "Travel the world & protect the environment"}
        </div>
      </div>
    );
  };
}

let mapStateToProps = state => {
  return {
    language: state.language
  };
};

let Navigation = withRouter(UnconnectedNavigation);
Navigation = connect(mapStateToProps)(UnconnectedNavigation);

export default Navigation;
