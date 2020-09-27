import React, { FC } from "react";
import { toCADString } from "../utils/money";
import { toLocalTime, humanize } from "../utils/time";

interface Props {
  departure: XDeparture;
  cities: City[];
  operators: Operator[];
  locations: Location[];
}

const DepartureCard: FC<Props> = ({
  departure,
  operators,
  locations,
  cities,
}) => {
  const {
    arrival_time,
    arrival_timezone,
    departure_time,
    departure_timezone,
    prices,
    duration,
    origin_location_id,
    destination_location_id,
    operator_id,
  } = departure;

  // Extract associated data from cities, locations and operators
  const price = toCADString(prices.total);
  const originLocation = locations.find((l) => l.id === origin_location_id);
  const destinationLocation = locations.find(
    (l) => l.id === destination_location_id
  );
  const operator = operators.find((o) => o.id === operator_id);
  const originCity = cities[0];
  const destinationCity = cities[1];

  // Build terminal location strings
  const originString = originCity && originLocation && (
    <span>
      {originCity.name} - {originLocation.name}
    </span>
  );
  const destinationString = destinationCity && destinationLocation && (
    <span>
      {destinationCity.name} - {destinationLocation.name}
    </span>
  );

  return (
    <div className="mx-0 p-6 w-full shadow-md max-w-screen-sm md:max-w-screen-md bg-white m-2">
      <div className="flex justify-between">
        <div className="mr-4 md:mr-20">
          {operator && (
            <img
              src={operator.logo_url}
              alt={`${operator.display_name} logo`}
              className="max-w-full"
              style={{ maxHeight: "80px" }}
            />
          )}
          <p>
            Departs{" "}
            <span className="font-semibold text-bb-blue">
              {toLocalTime(departure_time, departure_timezone)}
            </span>{" "}
            {originString}
          </p>
          <p className="text-gray-600 mb-2">
            Arrives{" "}
            <span className="font-semibold">
              {toLocalTime(arrival_time, arrival_timezone)}
            </span>{" "}
            {destinationString}
          </p>
          <p className="text-gray-600 italic">{humanize(duration, "en")}</p>
        </div>
        <div className="flex flex-col justify-between items-end">
          <p className="text-bb-blue font-bold text-xl">{price}</p>
          <button
            className="cursor-pointer bg-bb-orange text-white px-6 py-2"
            onClick={() => alert(NOPE)}
          >
            Select
          </button>
        </div>
      </div>
    </div>
  );
};

const NOPE =
  "This is Fauxsheaga, not Fyre Festival. We aren't going to charge you for a fake music extravaganza.";

export default DepartureCard;
