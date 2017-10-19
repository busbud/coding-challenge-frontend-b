import React, { Component } from 'react';

import '../styles/base.scss';

class Results extends Component {

  componentDidUpdate() {
    this._scrollToResults();
  }

  _scrollToResults() {
    var scrollIntoView = require('scroll-into-view');
    var node = document.getElementById('resultsMain');
    scrollIntoView(node, {
      time: 1500
    });
  }

  render() {
    if (this.props.displayResults === true) {
      return (
        <main className="results-container" id="resultsMain">
          <h1 className="result-header white-text">Here is what we found</h1>
  
          { this.props.departures.map((departure) => 
            <article key={ departure.departureID } className="result-card">
              <figure className="column operator-img">
                <img src={ departure.operatorImg }alt={"operator"} className="operator"/>
                <figcaption className="operator-name">{ departure.operator }</figcaption>
              </figure>
              <div className="column travel-info">
                <h2 className="travel-title">Departure</h2>
                <p className="departure"><span className="time">{ departure.departureTime }</span> - { departure.departureLocation }</p>
                <h2 className="travel-title">Arrival</h2>          
                <p className="arrival"><span className="time">{ departure.arrivalTime }</span> - { departure.arrivalLocation }</p>
                <hr/>          
                <p className="travel-time"><span className="duration">Total trip duration: </span> { departure.travelHours } hours and { departure.travelMinutes } minutes</p>
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
