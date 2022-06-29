import classes from "../style/Tickets.module.scss";
import { FormattedMessage } from "react-intl";
function Tickets({
  departures,
  locations,
  operators,
  cityOriginId,
  cityDestId,
  cities,
}) {
  return (
    <div className={classes.tickets}>
      <div className={classes.operatorSection}>
        <div className="operator">
          <img
            src={
              operators.find((o) => o.id === departures.operator_id).logo_url
            }
            alt={`op-${departures.operator_id}`}
          />
        </div>

        <div className="price">
          <div className="departure-price">
            {departures.prices.total / 100}({departures.prices.currency}
            )/
            <FormattedMessage id="person" />
          </div>
        </div>
      </div>

      <div className={classes.infoContainer}>
        <div className={classes.departure}>
          <span>{cities.find((c) => c.id === cityOriginId).name}</span> -{" "}
          <span>
            {new Date(departures.departure_time).toLocaleTimeString()}
          </span>{" "}
          -{" "}
          <span>
            {locations.find((l) => l.id === departures.origin_location_id).name}
          </span>
        </div>
        <div>
          <svg width="3" height="100%" viewBox="0 0 2 15">
            <line
              x2="1"
              color="hsl(204, 30%, 76%)"
              y2="14"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="1 3"
            ></line>
          </svg>
        </div>
        <div className={classes.arrival}>
          <span>{cities.find((c) => c.id === cityDestId).name}</span> -{" "}
          <span>{new Date(departures.arrival_time).toLocaleTimeString()}</span>-{" "}
          <span>
            {
              locations.find((l) => l.id === departures.destination_location_id)
                .name
            }
          </span>
        </div>
      </div>
      <div className={classes.select}>
        <div>
          <button>
            <FormattedMessage id="select" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Tickets;
