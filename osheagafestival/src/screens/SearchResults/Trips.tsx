import React from "react";

import { IOperator, ILocation, ICity, IDeparture } from "./../../api/ITicket";
import Trip from "./Trip";

interface ITipsProps {
  departures: ReadonlyArray<IDeparture>;
  operators: ReadonlyMap<string, IOperator>;
  locations: ReadonlyMap<string, ILocation>;
  originCity: ICity;
  arrivalCity: ICity;
}

const Trips: React.FC<ITipsProps> = ({
  departures,
  operators,
  locations,
  originCity,
  arrivalCity
}) => {
  return (
    <div>
      {departures.length === 0 ? (
        <div>No result</div>
      ) : (
        departures.map(departure => (
          <div key={departure.id}>
            <Trip
              departure={departure}
              operators={operators}
              locations={locations}
              originCity={originCity}
              arrivalCity={arrivalCity}
            />
          </div>
        ))
      )}
    </div>
  );
};

export default Trips;
