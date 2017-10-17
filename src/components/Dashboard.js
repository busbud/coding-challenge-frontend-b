import React, { Component } from 'react';

import '../styles/base.scss';
import Header from './header';
import Results from './results';

class Dashboard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      displayResults: false,
      departures: {}
    };
  }

  render() {
 
    return (
      <div className="dashboard">
        <Header />
        <Results />
      </div>
    );
  }
}

export default Dashboard;
