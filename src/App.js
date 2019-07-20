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
        <HomeContainer />
        {/* <DeparturesContainer /> */}
      </div>
    );
  }
}
