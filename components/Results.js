import PropTypes from "prop-types";
import Departure from "./Departure";

const Results = ({ cities, locations, departures, operators }) => (
  <section className="wrapper">
    <ul>
      {departures.map(departure => {
        const { departure_time, arrival_time, prices } = departure;
        const origin_location = locations.filter(
          location => location.id === departure.origin_location_id
        )[0];
        const origin_city = cities.filter(
          city => city.id === origin_location.city_id
        )[0];
        const destination_location = locations.filter(
          location => location.id === departure.destination_location_id
        )[0];
        const destination_city = cities.filter(
          city => city.id === destination_location.city_id
        )[0];
        const operator = operators.filter(
          operator => operator.id === departure.operator_id
        )[0];

        return (
          <Departure
            key={departure.id}
            origin_location={origin_location}
            origin_city={origin_city}
            destination_location={destination_location}
            destination_city={destination_city}
            operator={operator}
            departure_time={departure_time}
            arrival_time={arrival_time}
            prices={prices}
          />
        );
      })}
    </ul>
    <style jsx>{`
      ul {
        display: grid;
        grid-template-rows: 1fr;
        grid-gap: 32px;
        list-style: none;
        margin: 0 auto;
        max-width: 960px;
        padding-left: 0;
        padding-top: 48px;
      }
    `}</style>
  </section>
);

Results.propTypes = {
  cities: PropTypes.array,
  locations: PropTypes.array,
  departures: PropTypes.array,
  operators: PropTypes.array
};

export default Results;
