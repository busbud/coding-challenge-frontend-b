import React, {Component} from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

export default class Departure extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    departure: PropTypes.object.isRequired,
    currency: PropTypes.string.isRequired
  }

  findLocation(locationName) {
    const {data, departure} = this.props;

    return data.locations.find(location => location.id === departure[locationName]) || {};
  }

  render() {
    const {departure} = this.props;

    return (
      <li className="departure">
        <div className="departure__from">
          <span>{this.findLocation('origin_location_id').name}</span>
          <span>{moment(departure['departure_time']).format('hh:mm a')}</span>
        </div>
        <div className="departure__to">
          <span>{this.findLocation('destination_location_id').name}</span>
          <span>{moment(departure['arrival_time']).format('hh:mm a')}</span>
        </div>
        <div className="departure__price">
          <b>{(departure.prices.total / 100).toFixed(2)} </b> {this.props.currency}
        </div>
        <a href="#" className="departure__select button">Select</a>
      </li>
    );
  }
}
