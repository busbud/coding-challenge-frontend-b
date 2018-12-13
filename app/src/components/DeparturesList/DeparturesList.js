import React from "react";

import { withDepartures } from "../../hoc/withDepartures";

import { getOperatorByOperatorId, getLocationByLocationId } from "./../../utils/helper"

import DepartureCard from "./../DepartureCard/DepartureCard";
import Loading from "./../Loading/Loading";


import "./DeparturesList.scss";
const DeparturesList = ({ departures, operators, locations, cities }) => {
  return <div className="departures-list">
    {departures
      // Filter duplicated departures
      .filter((obj, pos, arr) => {
        return arr.map(mapObj => mapObj["busbud_departure_id"]).indexOf(obj["busbud_departure_id"]) === pos;
      })
      // Sort by date/hour
      .sort((a, b) => {
        return +new Date(a.departure_time) - +new Date(b.departure_time);
      })
      .map((departure, index) => {
        // Get cities
        const locationsWithCity = {
          origin: getLocationByLocationId(departure.origin_location_id, locations, cities.origin_city),
          destination: getLocationByLocationId(departure.destination_location_id, locations, cities.destination_city),
        }
        return <DepartureCard
          key={`departure-${index}`}
          departure={departure}
          operator={getOperatorByOperatorId(departure.operator_id, operators)}
          locations={locationsWithCity}
        />
      })}
    <Loading />
  </div>
};

export default withDepartures(DeparturesList);
