import React, { Component } from "react";
import "./App.css";
// import "./style/Departures.css";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navigation from "./Navigation.jsx";
import SearchBus from "./SearchBus.jsx";

class UnconnectedApp extends Component {
  render = () => {
    return (
      <div>
        <Router>
          <Navigation />
          <Route exact={true} path="/" component={SearchBus} />
        </Router>
      </div>
    );
  };
}

let App = connect()(UnconnectedApp);
export default App;
