import PropTypes from "prop-types";
import format from "date-fns/format";

const formatPrice = (price, currency) => {
  return `$${(price / 100).toFixed(2)} ${currency}`;
};

const formatTime = time => {
  return format(time, "HH:MM A");
};

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
        <span>Origin:</span> {origin_city.name} — {origin_location.name}
      </p>
      <p>
        <span>Destination:</span> {destination_city.name} –{" "}
        {destination_location.name}
      </p>
      <p>
        <span>Operator:</span> {operator.name}
      </p>
      <p>
        <span>Departure time:</span> {formatTime(departure_time)}
      </p>
      <p>
        <span>Arrival time:</span> {formatTime(arrival_time)}
      </p>
      <p>
        <span>Price:</span> {formatPrice(prices.total, prices.currency)}
      </p>
      <style jsx>{`
        li {
          background-color: #fff;
          border: 1px solid #ccc;
          box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.24);
          padding: 0 20px;
        }
        span {
          font-family: "Changa One";
          font-size: 20px;
        }
      `}</style>
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
