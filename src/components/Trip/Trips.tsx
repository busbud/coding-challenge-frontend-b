import React from "react";
import styled from "styled-components";

import Trip from "./Trip";
import { sm } from "../../assets/Spacing";

import { IOperator, ILocation, ICity, IDeparture } from "../../api/ITicket";

interface ITipsProps {
  arrivalCity: ICity;
  departures: ReadonlyArray<IDeparture>;
  locations: ReadonlyMap<string, ILocation>;
  operators: ReadonlyMap<string, IOperator>;
  originCity: ICity;
}

const Trips: React.FC<ITipsProps> = ({
  departures,
  operators,
  locations,
  originCity,
  arrivalCity
}) => (
  <div data-testid="trips">
    {departures.map(departure => (
      <TripContainer key={departure.id}>
        <Trip
          departure={departure}
          operators={operators}
          locations={locations}
          originCity={originCity}
          arrivalCity={arrivalCity}
        />
      </TripContainer>
    ))}
  </div>
);

const TripContainer = styled.div`
  margin-top: ${sm};
  display: flex;
  justify-content: center;
`;

export default Trips;
