import PropTypes from "prop-types";
import format from "date-fns/format";

import { fonts } from "../theme";
import Button from "./Button";

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
      <div className="left">
        <p>
          <span>Departs:</span> {formatTime(departure_time)} —{" "}
          {origin_city.name}, {origin_location.name}
        </p>
        <p>
          <span>Arrives:</span> {formatTime(arrival_time)} —{" "}
          {destination_city.name}, {destination_location.name}
        </p>
        <p>
          <span>Operated by:</span> {operator.name}
        </p>
      </div>
      <div className="right">
        <p className="price">{formatPrice(prices.total, prices.currency)}</p>
        <div className="button-wrapper">
          <Button>Buy now</Button>
        </div>
      </div>
      <style jsx>{`
        li {
          background-color: white;
          border-radius: 8px;
          box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.24);
          display: grid;
          grid-template-columns: 1fr;
          grid-row-gap: 16px;
          grid-column-gap: 32px;
          padding: 20px;
        }
        @media (min-width: 640px) {
          li {
            grid-template-columns: 1fr 240px;
          }
        }
        span {
          font-family: ${fonts.slab};
          font-size: 1.25rem;
        }
        .left p:first-of-type {
          margin-top: 0;
        }
        .left p:last-of-type {
          margin-bottom: 0;
        }
        .right {
        }
        @media (min-width: 640px) {
          .right {
            align-items: flex-end;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
          }
        }
        .price {
          font-family: ${fonts.slab};
          font-size: 2rem;
          margin: 0;
        }
        .button-wrapper {
          margin-top: 12px;
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
