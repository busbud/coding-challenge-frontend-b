import React, { Component } from 'react';
import './Dashboard.css';
import busBudLogo from '../img/busbud.png';
import { Button } from 'react-bootstrap';

class Dashboard extends Component {
  render() {
    const searchBtn = (<Button bsSize="large" bsStyle="warning">Search</Button>);

    return (
      <div className="dashboard">
        <header className="dashboard-header">
          <div className="navbar">
            <h2 className="powered-by white-text">Powered by <img src={busBudLogo}alt={"busBudLogo"} className="busbud-logo"/></h2>
            <p className="language white-text">
              <span>français</span>
              <span> / </span>
              <span className="active-language">english</span>
            </p>
          </div>
          <div className="header-content white-text">
            <h1 className="dashboard-title">Book your ticket to Montréal in time for Osheaga</h1>

            <div className="container search-info">
              <span className="departure quarter">
                <h2 className="search-info-h2">From </h2>
                <p className="search-p">NEW YORK CITY, NY</p>
              </span>
              <span className="arrival quarter">
                <h2 className="search-info-h2">To </h2>
                <p className="search-p">MONTRÉAL, QC</p>
              </span>
              <span className="date quarter">
                <h2 className="search-info-h2">When </h2>
                <p className="search-p">August 2nd, 2018</p>
              </span>
              <span className="passengers quarter">
                <h2 className="search-info-h2">Passengers </h2>
                <p className="search-p">1 adult</p>
              </span>
            </div>

            <div className="search-btn">
              {searchBtn}
            </div>
          </div>
        </header>
      </div>
    );
  }
}

export default Dashboard;
