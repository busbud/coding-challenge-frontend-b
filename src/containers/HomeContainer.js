import React from "react";

export default class HomeContainer extends React.Component {
  render() {
    return (
      <div className="home-page-container">
        <div className="page-header">
          <div className="page-header__icon" />
          <div className="page-header__tagline">
            Excited for an upcoming weekend at Osheaga? Click below to see all
            departures for one adult on Aug 2nd 2019 for the following route:
          </div>
          <h1>New York to Montreal</h1>
          <div className="button">Search</div>
        </div>
      </div>
    );
  }
}
