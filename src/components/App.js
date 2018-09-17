import React, { Component } from "react";
import Header from './Header';

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
      </div>
    );
  }
}

export default App;