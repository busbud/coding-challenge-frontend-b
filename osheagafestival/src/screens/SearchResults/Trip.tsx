import React from "react";
import styled from "styled-components";

import * as S from "./../../styledComponents";
import { IOperator, ILocation, ICity, IDeparture } from "./../../api/ITicket";
import { greyDark, primary, secondary } from "../../assets/Colors";
import { reg, sm } from "../../assets/Spacing";

interface ITripProps {
  departure: IDeparture;
  operators: ReadonlyMap<string, IOperator>;
  locations: ReadonlyMap<string, ILocation>;
  arrivalCity: ICity;
  originCity: ICity;
}

const Trip: React.FC<ITripProps> = ({
  arrivalCity,
  departure,
  locations,
  operators,
  originCity
}) => {
  const {
    arrivalLocationId,
    arrivalTime,
    departureLocationId,
    departureTime,
    prices,
    operatorId
  } = departure;
  return (
    <Card>
      <Time>{departureTime.toLocaleTimeString()}</Time>
      <LocationPin />
      <div>
        <City> {originCity.name}</City>
        <Location> {locations.get(departureLocationId)!.name}</Location>
      </div>

      <Time>{arrivalTime.toLocaleTimeString()}</Time>
      <LocationPin />
      <div>
        <City> {arrivalCity.name}</City>
        <Location> {locations.get(arrivalLocationId)!.name}</Location>
      </div>

      <Price>{`${(prices.total / 100).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      })} ${prices.currency}`}</Price>
      <OperatorLogo
        alt={operators.get(operatorId)!.name}
        src={operators.get(operatorId)!.logoUrl}
      />

      <Button className="pure-button pure-button-primary">
        <S.WhiteLink to="/purchase">Buy now</S.WhiteLink>
      </Button>
    </Card>
  );
};

const Card = styled(S.Card)`
  border: 1px solid ${greyDark};
  padding: ${sm};
  margin: ${reg} 0;
  display: grid;
  grid-template-rows: 1fr 1fr 1fr;
  grid-template-columns: 100px 100px 30px 100px 1fr;
  grid-row-gap: ${sm};
  align-items: center;
  width: 500px;
`;

const City = styled.span`
  color: ${greyDark};
`;

const Button = styled.span`
  margin: 0 ${reg};
  grid-row: 1 / span 3;
  grid-column: 5;
  align-self: center;
  background-color: ${primary};
`;

const OperatorLogo = styled.img`
  grid-column: 1;
  grid-row: 1 / span 3;
  width: 100px;
`;

const Location = styled.div`
  color: ${greyDark};
  font-size: 0.7em;
  font-weight: 300;
`;

const LocationPin = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 10px;
  background-color: ${primary};
  align-self: center;
  justify-self: center;
`;

const Price = styled.div`
  color: ${secondary};
  font-weight: bold;
  grid-column: 2 / span 3;
  justify-self: flex-end;
`;

const Time = styled.span`
  color: ${greyDark};
  justify-self: flex-end;
`;

export default Trip;
