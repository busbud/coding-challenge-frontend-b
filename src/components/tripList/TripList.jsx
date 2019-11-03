import React, { useState } from "react";
import styled from "styled-components";
import locationIcon from "../../assets/location.png";
import stage from "../../assets/stage.svg";
import { TripCard } from "../TripCard/TripCard";

const ListContainer = styled.div`
  display: flex;
  padding: 10px;
  flex-direction: column;
  width: 60%;
  width: 60%;
  @media screen and (max-width: 1200px) {
    width: 80%;
  }
  @media screen and (max-width: 800px) {
    width: 100%;
  }
`;

export const TripList = props => {
  console.log("trips", props.trips);
  return (
    <ListContainer>
      {props.trips.map((trip, index) => (
        <TripCard trip={trip} index={index} />
      ))}
    </ListContainer>
  );
};
