import React, { Component } from 'react';

import '../styles/base.scss';
import Header from './header';
import SearchBtn from './search';
import Results from './results';

class Dashboard extends Component {

  render() {
 
    return (
      <div className="dashboard">
        <Header />
        <SearchBtn />
        <Results />
      </div>
    );
  }
}

export default Dashboard;
