import React from 'react';

import styled from 'styled-components';
import moment from 'moment';
import { HiStop, HiLocationMarker } from 'react-icons/hi';

const StyledTripCard = styled.div`
  display: flex;
  flex-wrap: nowrap;
  align-items: stretch;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  max-width: 800px;
  background-color: #fff;
  border: solid 1px #dbdbdb;
  border-radius: 4px 20px 4px 20px;
  padding: 16px 20px;
  margin: 16px 0px 0px 0px;
  box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.18);
`;

const TopContainer = styled.div`
  display: flex;
  flex-wrap: nowrap;
  align-items: stretch;
  flex-direction: row;
  justify-content: flex-end;
`;

const MiddleContainer = styled.div`
  display: flex;
  flex-wrap: nowrap;
  align-items: stretch;
  flex-direction: row;
  justify-content: flex-start;
`;

const BottomContainer = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
`;

const StyledSelectButton = styled.button`
  width: 132px;
  height: 40px;
  border-radius: 4px 20px 4px 20px;
  border: none;
  cursor: pointer;
  font-size: 18px;
  font-weight: 5 00;
  background-color: #65a163;
  color: ${({ color }) => color || '#fff'};

  &:hover {
    opacity: 0.8;
    transform: scale(0.98);
  }
`;

const StyledLocation = styled.p`
  width: 100%;
  height: 40px;
  text-align: left;
  font-size: 18px;
  font-weight: 500;
  color: #001c3f;
`;

const StyledPrice = styled.p`
  width: 100%;
  height: 40px;
  text-align: right;
  font-size: 20px;
  font-weight: 700;
  color: #001c3f;
`;

const StyledLocationIcon = styled.div`
  font-size: 18px;
  height: 100%;
  padding: 1px 6px 0px 0px;
  color: #dbdbdb;
`;
const StyledDestinationIcon = styled.div`
  height: 100%;
  font-size: 18px;
  padding: 1px 6px 0px 0px;
  color: #001c3f;
`;

const TripCard = (props) => {
  const {
    departureTime,
    arrivalTime,
    originLocationName,
    destinationLocationName,
    price,
    currency,
  } = props.departure;

  const getTime = (dateString) => {
    const date = new Date(dateString);

    const time = moment(date).format('HH:mm A');

    return time;
  };

  return (
    <StyledTripCard>
      <TopContainer>
        <StyledPrice>
          ${price} {currency}
        </StyledPrice>
      </TopContainer>

      <MiddleContainer>
        <StyledLocationIcon>
          <HiStop />
        </StyledLocationIcon>

        <StyledLocation>
          {getTime(departureTime)} {originLocationName}
        </StyledLocation>
      </MiddleContainer>

      <MiddleContainer>
        <StyledDestinationIcon>
          <HiLocationMarker />
        </StyledDestinationIcon>
        <StyledLocation>
          {getTime(arrivalTime)} {destinationLocationName}
        </StyledLocation>
      </MiddleContainer>

      <BottomContainer>
        <StyledSelectButton>Select</StyledSelectButton>
      </BottomContainer>
    </StyledTripCard>
  );
};

export default TripCard;
