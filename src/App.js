import React from "react";

import { DeparturesContainer, HeaderContainer } from "./containers";

export default class App extends React.Component {
  render() {
    return (
      <div>
        <HeaderContainer />
        <DeparturesContainer />
      </div>
    );
  }
}
