import React, {Component} from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

export default class Departure extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    departure: PropTypes.object.isRequired,
    currency: PropTypes.string.isRequired
  }

  render() {
    const {data, departure} = this.props;
    const locationFrom = data.locations.find(location => location.id === departure['origin_location_id']);
    const locationTo = data.locations.find(location => location.id === departure['destination_location_id']);

    return (
      <li className="departure">
        <div className="departure__from">
          <span>{locationFrom.name}</span>
          <span>{moment(departure['departure_time']).format('hh:mm a')}</span>
        </div>
        <div className="departure__to">
          <span>{locationTo.name}</span>
          <span>{moment(departure['arrival_time']).format('hh:mm a')}</span>
        </div>
        <div className="departure__price">
          {(departure.prices.total / 100).toFixed(2)} {this.props.currency}
        </div>
      </li>
    );
  }
}
