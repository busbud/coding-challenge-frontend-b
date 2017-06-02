import React, { Component } from 'react';
import '../stylesheets/Ticket.css';
import moment from 'moment';

class Ticket extends Component {
  render() {
    const departure = this.props.departure;

    const operatorLogoUrl = departure.operator.logo_url;

    const depTime = moment(departure.departure_time).format('h:mm A');
    const arrTime = moment(departure.arrival_time).format('h:mm A');

    const priceStr = departure.prices.total.toString();
    const dollar = priceStr.substring(0,priceStr.length - 2);
    const cent = priceStr.substring(priceStr.length - 2);

    return (
      <div className="row ticket">
        <div className="col-lg-2 ticket-section operator">
          <img className="operator-logo" src={operatorLogoUrl} alt="Operator"></img>
        </div>
        <div className="col-lg-8 ticket-section ticket-locations">
          <div className="origin">
            <p className="location-name">{departure.origLocation.name}</p>
            <p className="city-name">{depTime} - {departure.origCity.name}</p>
          </div>
          <i className="glyphicon glyphicon-arrow-down"></i>
          <div className="destination">
            <p className="location-name">{departure.destLocation.name}</p>
            <p className="city-name">{arrTime} - {departure.destCity.name}</p>
          </div>
        </div>
        <div className="col-lg-2 ticket-section">
          <p>${dollar}.{cent} USD</p>
        </div>
      </div>
    );
  }
}

export default Ticket;
