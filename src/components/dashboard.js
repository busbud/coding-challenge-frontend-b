import React, { Component } from 'react';

import '../styles/base.scss';
import Header from './header';
import SearchBtn from './search';

class Dashboard extends Component {

  render() {
 
    return (
      <div className="dashboard">
        <Header />
        <SearchBtn /> 
      </div>
    );
  }
}

export default Dashboard;
