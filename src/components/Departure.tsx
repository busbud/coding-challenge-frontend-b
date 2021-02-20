import { Departure as DepartureType } from "../types";
import "./Departure.css";
import { useContext, useEffect, useState } from "react";
import { LocationContext } from "./Locations";
import { Location } from "../types";
import { formatTime } from "../utils";

function useLocationName(departure: DepartureType) {
  const locations = useContext(LocationContext);
  const [locationName, setLocationName] = useState(
    findLocationName(locations, departure)
  );
  useEffect(() => {
    if (locationName) return;
    setLocationName(findLocationName(locations, departure));
  }, [departure, locationName, locations]);
  return locationName;
}

export default function Departure(departure: DepartureType) {
  const locationName = useLocationName(departure);
  return (
    <div className="departure">
      <div className="section">
        <span className="label">Location</span>
        <span className="value">{locationName}</span>
      </div>
      <div className="section">
        <span className="label">Depart</span>
        <span className="value">{formatTime(departure.departure_time)}</span>
      </div>
      <div className="section">
        <span className="label">Arrive</span>
        <span className="value">{formatTime(departure.arrival_time)}</span>
      </div>
      <div className="section">
        <span className="label">Price</span>
        <span className="value">
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: departure.prices.currency,
          }).format(departure.prices.total / 100)}
        </span>
      </div>
    </div>
  );
}

function findLocationName(locations: Location[], departure: DepartureType) {
  const foundLocation = locations.find(
    ({ id }) => id === departure.origin_location_id
  );
  return foundLocation?.name ?? "";
}
