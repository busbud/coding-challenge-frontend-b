import React from "react";
import styled from "styled-components";
import moment from "moment";
import { DATE } from "../constants";

const resolveTime = isoDate => {
  return {
    value: `${moment(isoDate).format("HH")}:${moment(isoDate).format("MM")}`,
    isNextDay: !moment(DATE).isSame(isoDate, "day")
  };
};

export const Departure = ({ arrival_time, departure_time, originLocation, destinationLocation, price, operator }) => {
  return (
    <DepartureWrapper className="card-panel">
      <OperatorLogo operator={operator} />
      <LocationAndTime
        departureTime={resolveTime(departure_time)}
        arrivalTime={resolveTime(arrival_time)}
        originLocation={originLocation}
        destinationLocation={destinationLocation}
      />
      <Price>{price} $ US</Price>
    </DepartureWrapper>
  );
};
const Price = styled.div`
  white-space: nowrap;
  font-weight: 700;
`;

const DepartureWrapper = styled.div`
  display: flex;
  width: 80vw;
  padding: 0px 10px 0px 10px;
  max-width: 700px;
  justify-content: space-around;
  align-items: center;
`;

const OperatorLogo = ({ operator }) => (
  <div style={{ flexShrink: "3", minWidth: "50px", maxWidth: "15vw" }}>
    <Logo alt={`${operator.display_name}`} src={operator.logo_url} />{" "}
  </div>
);

const Logo = styled.img`
  width: 60%;
`;

const LocationAndTime = ({ arrivalTime, departureTime, originLocation, destinationLocation }) => {
  return (
    <Wrapper>
      <div style={{ fontWeight: "600" }}>
        {departureTime.value} {originLocation.name}
        <div style={{ textAlign: "center", marginTop: "2px" }}>
          <i className="center tiny material-icons">arrow_downward</i>
        </div>
      </div>

      <div>
        {arrivalTime.value} {destinationLocation.name}{" "}
        {arrivalTime.isNextDay && <span style={{ fontWeight: "300", fontSize: "12px" }}>(+1 d)</span>}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  align-items: start;
  align-self: stretch;
`;
