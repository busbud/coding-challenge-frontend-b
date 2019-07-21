import React from "react";

import {
  DeparturesContainer,
  HomeContainer,
  HeaderContainer
} from "./containers";

export default class App extends React.Component {
  state = {
    departuresOnDisplay: false
  };

  clickToViewDepartures = () => {
    this.setState({
      ...this.state,
      displayDepartures: !this.state.displayDepartures
    });
  };

  render() {
    const { displayDepartures } = this.state;
    return (
      <div className="full-height-layout">
        <header className="app-header">
          <HeaderContainer
            onClick={this.clickToViewDepartures}
            displayDepartures={displayDepartures}
          />
        </header>
        <main className="app-main">
          {!displayDepartures && (
            <HomeContainer onClick={this.clickToViewDepartures} />
          )}
          {displayDepartures && <DeparturesContainer />}
        </main>
      </div>
    );
  }
}
