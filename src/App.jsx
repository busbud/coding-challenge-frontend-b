import React, { Component } from "react";
// import logo from "./logo.svg";
import "./App.css";
import { connect } from "react-redux";
import { t } from "./Translations.jsx";
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  withRouter
} from "react-router-dom";
import Departures from "./Departures.jsx";

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
        <h1>{lng === "Fr" ? t("All departures") : "All departures"}</h1>
        <button onClick={this.changeLngFr}>Fr</button>
        <button onClick={this.changeLngEn}>En</button>
      </div>
    );
  };
}

class UnconnectedApp extends Component {
  render = () => {
    return (
      <div>
        <Router>
          <Navigation />
          <Route exact={true} path="/" component={Departures} />
        </Router>
      </div>
    );
  };
}

let Navigation = withRouter(UnconnectedNavigation);
Navigation = connect()(UnconnectedNavigation);

let mapStateToProps = state => {
  return {
    language: state.language
  };
};
let App = connect(mapStateToProps)(UnconnectedApp);
export default App;
