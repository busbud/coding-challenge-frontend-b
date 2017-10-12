import React, { Component } from 'react';

import '../styles/base.scss';
import Header from './Header';
import Results from './Results';

class Dashboard extends Component {
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
