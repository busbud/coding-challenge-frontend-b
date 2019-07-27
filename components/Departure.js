const Departure = props => {
  const {
    origin_city,
    origin_location,
    destination_city,
    destination_location,
    operator,
    departure_time,
    arrival_time,
    prices
  } = props;
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

export default Departure;
