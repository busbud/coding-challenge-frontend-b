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
          departureLocation={data.locations.find(x => x.id === departure.origin_location_id)}
          arrivalTime={departure.arrival_time}
          arrivalLocation={data.locations.find(x => x.id === departure.destination_location_id)}
          price={departure.prices.total / 100}
          currency={departure.prices.currency}
          operator={data.operators.find(x => x.id === departure.operator_id)}
          link={departure.links.deeplink}
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
