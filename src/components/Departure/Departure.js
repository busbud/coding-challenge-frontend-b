import React, { PropTypes } from 'react';
import './Departure.scss';

class Departure extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {

    let { departure } = this.props;

    //console.log('departure',departure);

    return (
      <div className="departure">
        <div className="departure__departure-time">
            {departure.departure_time}
        </div>
        <div className="departure__arrival-time">
            {departure.arrival_time}
        </div>
        <div className="departure__location-name">
            {departure.destination_location_id}
        </div>
        <div className="departure__price">
            {departure.prices.total}
        </div>
      </div>
    );
  }
}

Departure.propTypes = {
    departure: PropTypes.object.isRequired
};

export default Departure;