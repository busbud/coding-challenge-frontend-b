import React from "react";
import styled from "styled-components";

import * as S from "./../../styledComponents";
import { ICity, IDeparture } from "./../../api/ITicket";

import { white } from "./../../assets/Colors";

interface ITipsProps {
  destinationCity: ICity;
  originCity: ICity;
  departures: ReadonlyArray<IDeparture>;
}

const Trips: React.FC<ITipsProps> = ({ departures }) => {
  return (
    <>
      {departures.map(
        ({ id, operator, departureTime, arrivalTime, prices }) => (
          <S.Card key={id}>
            <Image alt={operator?.name} src={operator?.logoUrl} />
            <div>{departureTime.toLocaleTimeString()}</div>
            <div>{arrivalTime.toLocaleTimeString()}</div>
            <div>{`${prices.total} ${prices.currency}`}</div>
          </S.Card>
        )
      )}
    </>
  );
};

const Image = styled.img`
  width: 100px;
`;

export default Trips;
