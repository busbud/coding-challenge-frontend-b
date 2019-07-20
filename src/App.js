import React from "react";
import { Switch, Route } from "react-router-dom";
import { withRouter } from "react-router";

import {
  DeparturesContainer,
  HomeContainer,
  HeaderContainer
} from "./containers";

class App extends React.Component {
  render() {
    return (
      <div className="full-height-layout">
        <header className="app-header">
          <HeaderContainer {...this.props} />
        </header>
        <main className="app-main">
          <Switch>
            <Route exact path="/departures" component={DeparturesContainer} />
            <Route exact path="/" component={HomeContainer} />
          </Switch>
        </main>
      </div>
    );
  }
}

export default withRouter(App);
