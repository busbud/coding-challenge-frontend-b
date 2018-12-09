import PropTypes from 'prop-types';


export const Operator = PropTypes.shape({
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRquired,
});

export const Location = PropTypes.shape({
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
});

const Prices = PropTypes.shape({
  total: PropTypes.number.isRequired,
});

export const Departure = PropTypes.shape({
  operator_id: PropTypes.string.isRequired,
  origin_location_id: PropTypes.number.isRequired,
  destination_location_id: PropTypes.number.isRequired,
  prices: Prices.isRequired,
  departure_time: PropTypes.string.isRequired,
  arrival_time: PropTypes.string.isRequired,
});

export const Results = PropTypes.shape({
  locations: PropTypes.arrayOf(Location).isRequired,
  operators: PropTypes.arrayOf(Operator).isRequired,
  departures: PropTypes.arrayOf(Departure).isRequired,
});
