import PropTypes from "prop-types";
import format from "date-fns/format";

import { colours } from "../theme";
import Departure from "./Departure";

const Results = ({
  cities,
  locations,
  departures,
  operators,
  selected_date
}) => (
  <section className="wrapper">
    <h2>Results for {format(selected_date, "dddd Do MMMM YYYY")}</h2>
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
      section {
        padding-left: 24px;
        padding-right: 24px;
      }
      h2 {
        color: ${colours.blue};
        margin: 0;
        padding-top: 32px;
        text-align: center;
      }
      ul {
        display: grid;
        grid-template-rows: 1fr;
        grid-gap: 32px;
        list-style: none;
        margin: 0 auto;
        max-width: 960px;
        padding-left: 0;
        padding-top: 32px;
      }
    `}</style>
  </section>
);

Results.propTypes = {
  cities: PropTypes.array,
  locations: PropTypes.array,
  departures: PropTypes.array,
  operators: PropTypes.array,
  selected_date: PropTypes.instanceOf(Date)
};

export default Results;
