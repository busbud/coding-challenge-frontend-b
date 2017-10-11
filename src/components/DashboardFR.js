import React, { Component } from 'react';
import './Dashboard.css';
import busBudLogo from '../img/busbud.png';
import { Button } from 'react-bootstrap';

class DashboardFR extends Component {
  render() {
    const searchBtn = (<Button>Search</Button>);

    return (
      <div className="dashboard">
        <header className="dashboard-header">
          <div className="header-content white-text">
            <div className="language">
              <p className="white-text">
                <span className="active-language">français</span>
                <span> | </span>
                <span>english</span>
              </p>
            </div>
            <h1 className="dashboard-title">OsheagaBuddy</h1>
            <h2 className="powered-by">Powered by: <img src={busBudLogo}alt={"busBudLogo"} className="busbud-logo"/></h2>

            <div className="container search-info">
              <span className="departure quarter">
                <h2 className="search-info-h2">Departure: </h2>
                <p>NEW YORK CITY, NEW YORK</p>
              </span>
              <span className="arrival quarter">
                <h2 className="search-info-h2">Arrival: </h2>
                <p>MONTRÉAL, QUÉBEC</p>
              </span>
              <span className="date quarter">
                <h2 className="search-info-h2">Date: </h2>
                <p>August 2nd, 2018</p>
              </span>
              <span className="passengers quarter">
                <h2 className="search-info-h2">Passengers: </h2>
                <p>1 adult</p>
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

export default DashboardFR;
