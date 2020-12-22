import React, { useState } from "react";
import {
  Panel,
  TimeWrapper,
  Currency,
  LocationIndicator,
  Timeline,
  TimelineWrapper,
  DepartureTime,
  LocationName,
  InfoWrapper,
  Info,
  StyledExpandable
} from "./Styled";
import moment from "moment";

export const DepartureInfos = ({ departure }) => {
  const [showDetails, setShowDetails] = useState(false);
  const {
    departure_time,
    arrival_time,
    prices: { total },
    trip_stops
  } = departure;
  return (
    <>
      <Panel>
        {departure_time && (
          <>
          <InfoWrapper>
            <TimeWrapper>
              <p> {moment(departure_time).format("HH:MM A")}</p>
              {" -- "}
              <p>{moment(arrival_time).format("HH:MM A")}</p>
            </TimeWrapper>
              <Currency>${total}</Currency>
            </InfoWrapper>
            <StyledExpandable onClick={() => setShowDetails(!showDetails)}>
              {" "}
              {showDetails ? "Hide journey" : "Show journey"}
            </StyledExpandable>
            {showDetails &&
              trip_stops.map(stop => (
                  <InfoWrapper key={stop.location_id}>
                    <TimelineWrapper>
                      <LocationIndicator />
                      {stop.departure_time && <Timeline />}
                    </TimelineWrapper>
                    <Info>
                      <DepartureTime>
                        {stop.departure_time
                          ? moment(stop.departure_time).format("HH:MM A")
                          : moment(stop.arrival_time).format("HH:MM A")}
                      </DepartureTime>
                      <LocationName>{stop.name} </LocationName>
                    </Info>
                  </InfoWrapper>
              ))}
          </>
        )}
      </Panel>
    </>
  );
};
