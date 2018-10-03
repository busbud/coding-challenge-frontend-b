import React, { Component }   from "react";
import { translate }          from "react-i18next";
import Header                 from "./Header";
import DepartureListContainer from "./DepartureListContainer";

class App extends Component {

  constructor() {
    super();
    this.state = {
    };
  }

  render() {
    return (
      <div className="app">
        <Header />
        <DepartureListContainer />
      </div>
    );
  }
}

export default translate("common")(App);