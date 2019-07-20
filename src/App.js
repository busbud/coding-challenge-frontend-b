import React from "react";

import {
  DeparturesContainer,
  HomeContainer,
  HeaderContainer
} from "./containers";

export default class App extends React.Component {
  render() {
    return (
      <div className="full-height-layout">
        <header className="app-header">
          <HeaderContainer />
        </header>
        <div className="app-main">
          {/* <HomeContainer /> */}
          <DeparturesContainer />
        </div>
      </div>
    );
  }
}
