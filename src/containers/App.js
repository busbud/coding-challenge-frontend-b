import React, { Component } from 'react';
import './App.css';
import api from '../api.js';

import DepartureList from "../components/DepartureList.js";

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      departures: api.searchDepartures()
    }
  }

  render() {
    return (
      <div className="App container">
        <DepartureList departures={this.state.departures}/>
      </div>
    );
  }
}

export default App;
