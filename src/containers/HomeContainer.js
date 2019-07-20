import React from "react";

export default class HeaderContainer extends React.Component {
  render() {
    return (
      <div className="home-page-container">
        <p>Excited for an upcoming weekend at Osheaga?</p>
        <p>
          Click below to see all departures for one adult on Aug 2nd 2019 for
          the following route:
        </p>
        <h1>New York to Montreal</h1>
        <button>Search</button>
      </div>
    );
  }
}
