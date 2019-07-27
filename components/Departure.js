import PropTypes from "prop-types";

const Departure = ({
  origin_city,
  origin_location,
  destination_city,
  destination_location,
  operator,
  departure_time,
  arrival_time,
  prices
}) => {
  return (
    <li>
      <p>
        Origin: {origin_city.name} - {origin_location.name}
      </p>
      <p>
        Destination: {destination_city.name} - {destination_location.name}
      </p>
      <p>Operator: {operator.name}</p>
      <p>Departure time: {departure_time}</p>
      <p>Arrival time: {arrival_time}</p>
      <p>Price: {prices.total}</p>
    </li>
  );
};

Departure.propTypes = {
  origin_city: PropTypes.object,
  origin_location: PropTypes.object,
  destination_city: PropTypes.object,
  destination_location: PropTypes.object,
  operator: PropTypes.object,
  departure_time: PropTypes.string,
  arrival_time: PropTypes.string,
  prices: PropTypes.object
};

export default Departure;
