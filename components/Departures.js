import Departure from "./Departure";

const Departures = ({ data }) => (
  <div>
    <p>Results:</p>
    <ul>
      {data.departures.map(departure => {
        const { departure_time, arrival_time, prices } = departure;
        const origin_location = data.locations.filter(
          location => location.id === departure.origin_location_id
        )[0];
        const origin_city = data.cities.filter(
          city => city.id === origin_location.city_id
        )[0];
        const destination_location = data.locations.filter(
          location => location.id === departure.destination_location_id
        )[0];
        const destination_city = data.cities.filter(
          city => city.id === destination_location.city_id
        )[0];
        const operator = data.operators.filter(
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
  </div>
);

export default Departures;
