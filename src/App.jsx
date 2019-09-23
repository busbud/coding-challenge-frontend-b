import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { connect } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  withRouter,
  Redirect
} from "react-router-dom";
import Departures from "./Departures.jsx";

class UnconnectedNavigation extends Component {
  render = () => {
    return (
      <div>
        <div>
          <NavLink to={"/"}>Home</NavLink>
        </div>
        <div>
          <button>Fr</button>
          <button>En</button>
        </div>
      </div>
    );
  };
}

let renderDeparturesDetails = routerData => {
  return (
    <div>
      {console.log(
        "routerData.match.params.origin",
        routerData.match.params.origin
      )}
      <Departures
        origin={routerData.match.params.origin}
        destination={routerData.match.params.destination}
        outbound_date={routerData.match.params.outbound_date}
        history={routerData.history}
      />
    </div>
  );
};

class UnconnectedApp extends Component {
  render = () => {
    return (
      <div>
        All departures
        <Router>
          <Navigation />
          <Route exact={true} path="/" component={Departures} />
         
          <Route
            exact={true}
            path="/x-departures/:origin/:destination/:outbound_date"
            render={renderDeparturesDetails}
          />
        </Router>
      </div>
    );
  };
}

let Navigation = withRouter(UnconnectedNavigation);

let App = connect()(UnconnectedApp);
export default App;
