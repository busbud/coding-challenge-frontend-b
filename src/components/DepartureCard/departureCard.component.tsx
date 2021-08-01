import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { convertPrice, parseTime } from "../../utils/utils";
import { BusbudContext } from "../../interfaces/context.interface";

const DepartureCard = ({ data }) => {
  const { currencyValue } = useContext(BusbudContext);

  const { t } = useTranslation();

  const {
    departure_time,
    arrival_time,
    prices: { total },
    trip_stops,
    origin_location_id,
    destination_location_id,
  } = data;

  const origin = trip_stops.find((stop) => {
    return stop.location_id === origin_location_id;
  });

  const destination = trip_stops.find((stop) => {
    return stop.location_id === destination_location_id;
  });

  return (
    <div className="departure-card">
      <div className="departure-card-travel-info">
        <div className="departure-card-origin">
          <span className="departure-card-origin-name">{origin.name}</span>
          <span className="departure-card-origin-time">
            {parseTime(departure_time)}
          </span>
        </div>
        <div className="departure-card-arrow">&#10230;</div>
        <div className="departure-card-destination">
          <span className="departure-card-destination-name">
            {destination.name}
          </span>
          <span className="departure-card-destination-time">
            {parseTime(arrival_time)}
          </span>
        </div>
      </div>
      <div className="departure-card-price">
        {convertPrice(total, currencyValue)}
      </div>
      <div className="departure-card-select">
        <button type="button" title={t("departures.select")}>
          {t("departures.select")}
        </button>
      </div>
    </div>
  );
};

export default DepartureCard;
