import { Departure as DepartureType } from "../types";
import "./Departure.css";
import { format, parseISO } from "date-fns";

/*
For each departure, we want, at least, to see the 
departure time, 
the arrival time, 
the location name and 
the price (use prices.total of the departure).
*/

function formatTime(dateString: string) {
  return format(parseISO(dateString), "p");
}

export default function Departure(departure: DepartureType) {
  return (
    <div className="departure">
      <span className="label">Departure Time</span>
      <span className="value">{formatTime(departure.departure_time)}</span>
      <span className="label">Arrival Time</span>
      <span className="value">{formatTime(departure.arrival_time)}</span>
      <span className="label">Price</span>
      <span className="value">
        {new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: departure.prices.currency,
        }).format(departure.prices.total / 100)}
      </span>
    </div>
  );
}
