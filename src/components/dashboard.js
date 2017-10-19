import React, { Component } from 'react';

import '../styles/base.scss';
import Header from './header';
import SearchBtn from './search';
import Loading from './loading';

class Dashboard extends Component {

  render() {
 
    return (
      <div className="dashboard">
        <Header />
        <SearchBtn /> 
        <Loading />
      </div>
    );
  }
}

export default Dashboard;
