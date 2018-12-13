import React, { Component } from "react";

import DeparturesProvider from "./store/DeparturesProvider/DeparturesProvider";

import DeparturesList from "./components/DeparturesList/DeparturesList";
import Search from "./components/Search/Search";

import "./App.scss";

class App extends Component {

  render() {
    return (
      <div className="app">
        <DeparturesProvider>
          <Search />
          <DeparturesList />
        </DeparturesProvider>
      </div>
    );
  }
}

export default App;
