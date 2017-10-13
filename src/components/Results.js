import React, { Component } from 'react';

import '../styles/base.scss';
import Placeholder from '../img/500x500.png';

class Results extends Component {

  render() {
    // const results = this._getResults() || [];

    return (
    // <div>{results}</div>);
    <main className="results-container">
      <h1 className="result-header white-text">Here is what we found</h1>
      <article className="result-card">
        <div className="column operator-img">
          <img src={ Placeholder }alt={"placeholder"} className="operator"/>
          <p className="operator-name">Greyhound</p>
        </div>
        <div className="column travel-info">
          <h2 className="travel-title">Departure</h2>
          <p className="departure"><span className="time">10:00</span> - NYC Train Station</p>
          <h2 className="travel-title">Arrival</h2>          
          <p className="arrival"><span className="time">23:59</span> - MTL Train Station</p>
          <hr/>          
          <p className="travel-time"><span className="duration">Total trip duration: </span> 8 hours and 59 minutes</p>
        </div>
        <div className="column price-info">
            <p className="price">50$ <span className="currency">CAD</span></p>
        </div>
      </article>
    </main>
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
