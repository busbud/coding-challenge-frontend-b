import React from "react";
import styled from "styled-components";
import moment from "moment";
import { Departure } from "./Departure";

const sortDepartures = departures => {
  return departures.sort((a, b) => moment(a.departure_time) - moment(b.departure_time));
};

const computePrice = price => {
  return Math.round(price / 100);
};

const resolveValue = (collection, targetId) => {
  return collection.filter(item => item.id === targetId)[0];
};

const DepartureList = ({ searchResult }) => {
  const { departures, locations, operators } = searchResult;

  return (
    <DeparturesWrapper>
      {sortDepartures(departures).map(departure => {
        const {
          busbud_departure_id,
          arrival_time,
          departure_time,
          destination_location_id,
          origin_location_id,
          prices,
          operator_id
        } = departure;
        return (
          <Departure
            key={busbud_departure_id}
            arrival_time={arrival_time}
            departure_time={departure_time}
            originLocation={resolveValue(locations, origin_location_id)}
            destinationLocation={resolveValue(locations, destination_location_id)}
            operator={resolveValue(operators, operator_id)}
            price={computePrice(prices.total)}
          />
        );
      })}
    </DeparturesWrapper>
  );
};

const DeparturesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default DepartureList;
