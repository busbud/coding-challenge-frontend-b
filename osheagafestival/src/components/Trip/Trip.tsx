import React from "react";
import styled from "styled-components";

import * as S from "../../styledComponents";
import { IOperator, ILocation, ICity, IDeparture } from "../../api/ITicket";
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
      <Timeline>
        <LocationPin />
        <LocationPin />
      </Timeline>
      <div>
        <City> {originCity.name}</City>
        <Location> {locations.get(departureLocationId)!.name}</Location>
      </div>

      <Time>{arrivalTime.toLocaleTimeString()}</Time>
      <div>
        <City> {arrivalCity.name}</City>
        <Location> {locations.get(arrivalLocationId)!.name}</Location>
      </div>

      <OperatorLogo
        alt={operators.get(operatorId)!.name}
        src={operators.get(operatorId)!.logoUrl}
      />

      <Price>{`${(prices.total / 100).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      })} ${prices.currency}`}</Price>
      <Button className="pure-button pure-button-primary">
        <S.WhiteLink to="/purchase">Buy now</S.WhiteLink>
      </Button>
    </Card>
  );
};

const Card = styled(S.Card)`
  display: grid;
  grid-template-rows: 1fr 1fr;
  grid-template-columns: 100px 100px 10px 100px 1fr;
  grid-column-gap: ${sm};
  grid-row-gap: ${reg};
  align-items: center;
`;

const City = styled.span`
  color: ${greyDark};
`;

const Button = styled.span`
  margin: 0 ${reg};
  grid-row: 2;
  grid-column: 5;
  align-self: center;
  background-color: ${primary};
`;

const OperatorLogo = styled.img`
  grid-row: 1 / span 2;
  grid-column: 1;
  align-self: center;
  width: 100px;
`;

const Location = styled.div`
  color: ${greyDark};
  font-size: 0.7em;
  font-weight: 300;
`;

const Timeline = styled.div`
  grid-row: 1 / span 2;
  grid-column: 3;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  position: relative;

  &:before {
    content: " ";
    top: 25%;
    bottom: 25%;
    left: 50%;
    width: 1px;
    position: absolute;
    background-color: ${primary};
  }
`;

const LocationPin = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 10px;
  background-color: ${primary};
`;

const Price = styled.div`
  color: ${secondary};
  font-weight: bold;
  grid-column: 5;
  grid-row: 1;
  align-self: center;
  justify-self: center;
`;

const Time = styled.span`
  color: ${greyDark};
  justify-self: flex-end;
`;

export default Trip;
