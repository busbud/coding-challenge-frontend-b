import React from 'react';
import PropTypes from 'prop-types';
import ResultsCard from './ResultsCard';

function Results(props) {
  const {
    isLoading,
    data,
  } = props;

  if (isLoading) {
    return <div className="loading">Loading results...</div>;
  }

  return (
    <div className="results">
      {data.departures.map(departure => (
        <ResultsCard
          departureTime={departure.departure_time}
          arrivalTime={departure.arrival_time}
          price={departure.prices.total / 100}
          currency={departure.prices.currency}
        />
      ))}
    </div>
  );
}

Results.defaultProps = {
  isLoading: true,
  data: {},
};

Results.propTypes = {
  isLoading: PropTypes.bool,
  data: PropTypes.shape({
    origin_city_id: PropTypes.string,
    destination_city_id: PropTypes.string,
    cities: PropTypes.array,
    locations: PropTypes.array,
    operators: PropTypes.array,
    departures: PropTypes.array,
    complete: PropTypes.bool,
    ttl: PropTypes.number,
    is_valid_route: PropTypes.bool,
  }),
};

export default Results;
