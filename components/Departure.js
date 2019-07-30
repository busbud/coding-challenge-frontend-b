import PropTypes from "prop-types";
import format from "date-fns/format";

import { withTranslation } from "../lib/i18n";
import { fonts } from "../lib/theme";
import Button from "./Button";

const formatPrice = (price, currency) => {
  return `$${(price / 100).toFixed(2)} ${currency}`;
};

const formatTime = time => {
  return format(time, "HH:mm A");
};

const Departure = ({
  origin_city,
  origin_location,
  destination_city,
  destination_location,
  operator,
  departure_time,
  arrival_time,
  prices,
  t
}) => {
  return (
    <li>
      <div className="left">
        <div className="row">
          <p className="heading">{t("departs")}</p>
          <p>
            <strong className="departure-time">
              {formatTime(departure_time)}
            </strong>{" "}
            — <span className="origin-city-name">{origin_city.name}</span>,{" "}
            <span className="origin-location-name">{origin_location.name}</span>
          </p>
        </div>
        <div className="row">
          <p className="heading">{t("arrives")}</p>
          <p>
            <strong className="arrival-time">{formatTime(arrival_time)}</strong>{" "}
            —{" "}
            <span className="destination-city-name">
              {destination_city.name}
            </span>
            ,{" "}
            <span className="destination-location-name">
              {destination_location.name}
            </span>
          </p>
        </div>
        <div className="row">
          <p className="heading">{t("operated-by")}</p> <p />
          <p>
            <strong className="operator-name">{operator.name}</strong>
          </p>
        </div>
      </div>
      <div className="right">
        <p className="price">{formatPrice(prices.total, prices.currency)}</p>
        <div className="button-wrapper">
          <Button>{t("buy-now")}</Button>
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
            grid-template-columns: 1fr 220px;
          }
        }
        .row {
          display: flex;
          flex-wrap: wrap;
        }
        .row + .row {
          margin-top: 16px;
        }
        @media (min-width: 800px) {
          .row {
            flex-wrap: nowrap;
          }
        }
        .heading {
          flex-basis: 100%;
          min-width: 150px;
          padding-top: 4px;
        }
        @media (min-width: 800px) {
          .heading {
            flex-basis: auto;
          }
        }
        p {
          margin: 0;
        }
        strong {
          font-family: ${fonts.slab};
          font-size: 1.25rem;
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
  id: PropTypes.string.isRequired,
  origin_city: PropTypes.object.isRequired,
  origin_location: PropTypes.object.isRequired,
  destination_city: PropTypes.object.isRequired,
  destination_location: PropTypes.object.isRequired,
  operator: PropTypes.object.isRequired,
  departure_time: PropTypes.string.isRequired,
  arrival_time: PropTypes.string.isRequired,
  prices: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired
};

export default withTranslation("common")(Departure);
