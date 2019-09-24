import React, { Component } from "react";
// import logo from "./logo.svg";
import "./App.css";
import { connect } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  withRouter
} from "react-router-dom";
import Departures from "./Departures.jsx";

class UnconnectedNavigation extends Component {
  render = () => {
    return (
      <div>
        <button>Fr</button>
        <button>En</button>
      </div>
    );
  };
}

class UnconnectedApp extends Component {
  render = () => {
    return (
      <div>
        All departures
        <Router>
          <Navigation />
          <Route exact={true} path="/" component={Departures} />
        </Router>
      </div>
    );
  };
}

let Navigation = withRouter(UnconnectedNavigation);

let App = connect()(UnconnectedApp);
export default App;
