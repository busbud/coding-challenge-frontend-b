import React from 'react';

export function Departure(props) {
  return (
    <div>
      <div>
        Departure Time: {props.departure.departure_time}
      </div>
      <div>
        Arrival Time: {props.departure.arrival_time}
      </div>
      <div>
        Departure Location: {props.departure.departure_location}
      </div>
      <div>
        Arrival Location: {props.departure.arrival_location}
      </div>
      <div>
        Price: {props.departure.prices.total}
      </div>
    </div>
  );
}

Departure.propTypes = {
  departure: React.PropTypes.object.isRequired,
};
