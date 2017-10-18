import React, { Component } from 'react';

import '../styles/base.scss';
import busBudLogo from '../img/busbud.png';

class Header extends Component {

  constructor() {
    super();

    this.state = {
      displayResults: false,
      departures: {}
    }
  }
  
  render() {

    return (
      <header className="header">
        <div className="top-bar">
          <h2 className="powered-by white-text">Powered by <img src={busBudLogo}alt={"busBudLogo"} className="busbud-logo"/></h2>
          <p className="language white-text">
            <span><a href="./dashboardFR">français</a></span>
            <span> / </span>
            <span className="active-language"><a href="./dashboard">english</a></span>
          </p>
        </div>

        <div className="header-content white-text">
          <h1 className="dashboard-title">Book your ticket to Montréal in time for Osheaga</h1>

          <div className="container search-info">
            <span className="quarter">
              <h2 className="search-info-titles">From </h2>
              <p className="search-input">NEW YORK CITY, NY</p>
            </span>
            <span className="quarter">
              <h2 className="search-info-titles">To </h2>
              <p className="search-input">MONTRÉAL, QC</p>
            </span>
            <span className="quarter">
              <h2 className="search-info-titles">When </h2>
              <p className="search-input">August 2nd, 2018</p>
            </span>
            <span className="quarter">
              <h2 className="search-info-titles">Passengers </h2>
              <p className="search-input">1 adult</p>
            </span>
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
