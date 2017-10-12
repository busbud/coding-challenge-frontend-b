import React, { Component } from 'react';

import '../styles/base.scss';

class Results extends Component {
  render() {
    // const results = this._getResults() || [];

    return (
    // <div>{results}</div>);
    <div className="results-container">
      <h1 className="result-header white-text">Here are your results</h1>
      <div className="result-card">
        <span className="travel-info">
          <ul>
            <li>
              <h2 className="departure"><span className="dpt-time">10:00</span> Departure</h2>
              <p className="location">Departure location</p>
            </li>
            <li>
              <h2 className="arrival"><span className="arvl-time">23:59</span> Arrival</h2>
              <p className="location">Arrival location</p>
            </li>
          </ul>
        </span>
        <span className="price-info">
          <h2 className="price">50$ <span className="currency">CAD</span></h2>
        </span>
      </div>
    </div>
    );
  }

  // _getResults() {
  //   const busTickets = {

  //   };

  //   return busTickets.map((busTicket) => {
  //     return (
  //       <div>test</div>
  //     );
  //   });
  // }
}

export default Results;
