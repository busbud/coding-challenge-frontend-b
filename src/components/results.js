import React, { Component } from 'react';

import '../styles/base.scss';

class Results extends Component {

  render() {

    if (this.props.displayResults) {
      return (
        <main className="results-container">
          <h1 className="result-header white-text">Here is what we found</h1>
  
          { this.props.departures.map((departure) => 
            <article className="result-card">
              <div className="column operator-img">
                <img src={ departure.operatorImg }alt={"operator"} className="operator"/>
                <p className="operator-name">{ departure.operator }</p>
              </div>
              <div className="column travel-info">
                <h2 className="travel-title">Departure</h2>
                <p className="departure"><span className="time">{ departure.departureTime }</span> - { departure.departureLocation }</p>
                <h2 className="travel-title">Arrival</h2>          
                <p className="arrival"><span className="time">{ departure.arrivalTime }</span> - { departure.arrivalLocation }</p>
                <hr/>          
                <p className="travel-time"><span className="duration">Total trip duration: </span> 8 hours and 59 minutes</p>
              </div>
              <div className="column price-info">
                  <p className="price">{ departure.price }$ <span className="currency">{ departure.currency }</span></p>
              </div>
            </article>
          )}
        </main>
      );
    } else {
      return null;
    }
  }
}

export default Results;
