import React, { Component } from "react";
import "../styles/App.css";
import Search from "./Search";

class App extends Component {
  render = () => {
    return (
      <div className="App">
        <Search />
      </div>
    );
  };
}

export default App;
