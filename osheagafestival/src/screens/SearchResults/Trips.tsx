import React from "react";

import { ICity, IDeparture } from "./../../api/ITicket";
import Trip from "./Trip";

interface ITipsProps {
  departures: ReadonlyArray<IDeparture>;
  destinationCity: ICity;
  originCity: ICity;
}

const Trips: React.FC<ITipsProps> = ({
  departures,
  destinationCity,
  originCity
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
              destinationCity={destinationCity}
              originCity={originCity}
            />
          </div>
        ))
      )}
    </div>
  );
};

export default Trips;
