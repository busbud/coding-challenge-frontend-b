import React, { Component } from "react";

import Search from "./components/Search/Search";
import Results from "./components/Results/Results";

import "./App.scss";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header" />
        <Search />
        <Results />
      </div>
    );
  }
}

export default App;
