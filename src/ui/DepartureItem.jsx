import React from 'react';
import ReactDOM from "react-dom";

import moment from 'moment';
import Moment from 'react-moment';

/** Component that display departures item in departure results. */
export default class DepartureItem extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  /**
   * Computes durations in minutes between 2 datetimes
   * This implementation should support durations over 24 hours
   */
  computeDuration(departureTime, arrivalTime) {
    const ms = moment(arrivalTime).diff(moment(departureTime));
    const d = moment.duration(ms);
    return Math.floor(d.asHours()) + 'h ' + moment.utc(ms).format("mm") + 'm';
  }

  /**
   * Format price according to currency and language settings
   * We do not display cents if not relevant (ie. if cents value is 0)
   */
  formatPrice(centPrice) {
    const price = centPrice.toFixed(2) / 100;
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'CAD', minimumFractionDigits: 0 }).format(price)
  }

  /**
   * Return the location name from its id
   */
  getLocationName(locationId) {
    const location = this.props.locations.find((location) => {
      return location.id === locationId;
    });
    return location.name;
  }

  /**
   * Return the operator name from its id
   */
  getOperatorName(operatorId) {
    const operator = this.props.operators.find((operator) => {
      return operator.id === operatorId;
    });
    return operator.name;
  }

  /**
   * Render departure item
   */
  render() {
    const departure = this.props.departure;
    return (
      <div className="departure-item">
        <div className="row">
          <div className="col-md-10">{this.getOperatorName(departure.operator_id)}</div>
          <div className="col-md-2 text-right">{this.formatPrice(departure.prices.total)}</div>
        </div>
        <div className="row">
          <Moment className="col-md-2" format="hh:mm a">{departure.departure_time}</Moment>
          <div className="col-md-10">{this.getLocationName(departure.origin_location_id)}</div>
        </div>
        <div className="row">
          <Moment className="col-md-2" format="hh:mm a">{departure.arrival_time}</Moment>
          <div className="col-md-10">{this.getLocationName(departure.destination_location_id)}</div>
        </div>
        <div className="row">
          <div className="col-md-12">{this.computeDuration(departure.departure_time, departure.arrival_time)}</div>
        </div>
      </div>
    );
  }

}