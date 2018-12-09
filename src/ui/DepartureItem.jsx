import React from 'react';

import PropTypes from 'prop-types';

import moment from 'moment';
import Moment from 'react-moment';

import { Operator, Location, Departure } from '../types';

/** Component that display departures item in departure results. */
export default class DepartureItem extends React.PureComponent {
  /**
   * Computes durations in minutes between 2 datetimes
   * This implementation should support durations over 24 hours
   */
  static computeDuration(departureTime, arrivalTime) {
    const ms = moment(arrivalTime).diff(moment(departureTime));
    const d = moment.duration(ms);
    return `${Math.floor(d.asHours())}h${moment.utc(ms).format('mm')}m`;
  }

  /**
   * Return the operator name from its id
   */
  getOperatorName(operatorId) {
    const { operators } = this.props;
    const operator = operators.find(op => op.id === operatorId);
    return operator.name;
  }

  /**
   * Return the location name from its id
   */
  getLocationName(locationId) {
    const { locations } = this.props;
    const location = locations.find(loc => loc.id === locationId);
    return location.name;
  }

  /**
   * Format price according to currency and language settings
   * We do not display cents if not relevant (ie. if cents value is 0)
   */
  formatPrice(centPrice) {
    const price = centPrice.toFixed(2) / 100;
    const { currency } = this.props;
    return new Intl.NumberFormat('en-US', { style: 'currency', minimumFractionDigits: 0, currency }).format(price);
  }

  /**
   * Render departure item
   */
  render() {
    const { departure } = this.props;
    return (
      <div className="departure-item">
        <div className="row">
          <div className="col-md-10 operator">{this.getOperatorName(departure.operator_id)}</div>
          <div className="col-md-2 text-right price">{this.formatPrice(departure.prices.total)}</div>
        </div>
        <div className="row">
          <div className="col-md-10">
            <div className="row">
              <Moment className="col-md-3" format="hh:mm a">{departure.departure_time}</Moment>
              <div className="col-md-9">{this.getLocationName(departure.origin_location_id)}</div>
            </div>
            <div className="row">
              <Moment className="col-md-3" format="hh:mm a">{departure.arrival_time}</Moment>
              <div className="col-md-9">{this.getLocationName(departure.destination_location_id)}</div>
            </div>
          </div>
          <div className="col-md-2">
            <div className="duration">{DepartureItem.computeDuration(departure.departure_time, departure.arrival_time)}</div>
          </div>
        </div>
      </div>
    );
  }
}

DepartureItem.propTypes = {
  operators: PropTypes.arrayOf(Operator).isRequired,
  locations: PropTypes.arrayOf(Location).isRequired,
  departure: Departure.isRequired,
  currency: PropTypes.string.isRequired,
};
