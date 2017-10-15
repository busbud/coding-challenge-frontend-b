import React, { Component } from 'react';

import '../styles/base.scss';
import Header from './header';
import Results from './results';

class Dashboard extends Component {
  render() {
 
    return (
      <div className="dashboard">
        <Header />
        <Results />
      </div>
    );
  }

  // _toggleResults() {
  //   this.setState({
  //     startSearch: !this.state.showResults
  //   })
  // }
}

export default Dashboard;
