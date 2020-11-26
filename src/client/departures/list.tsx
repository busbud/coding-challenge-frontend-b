import { DepartureResponse } from '@root/api';
import { React, styled } from '@client/dependencies';
import { Departure } from './departure';
import { enrichDepartures, getPrice, timeToLocalTime } from './utils';

const Container = styled.div`
  margin-bottom: 2rem;
`;

export const DepartureList: React.FC<{ departures?: DepartureResponse }> = ({
  departures,
  children,
}) => {
  if (departures == null) {
    return null;
  }

  const enrichedDepartures = React.useMemo(() => enrichDepartures(departures), [
    departures.origin_city_id,
    departures.locations.length,
  ]);

  return (
    <Container>
      <header>{children}</header>
      {enrichedDepartures.length > 0 ? (
        enrichedDepartures.map((d) => (
          <Departure
            key={d.id}
            locationName={d.destination_location.name}
            arrivalTime={timeToLocalTime(d.arrival_time, d.arrival_timezone)}
            departureTime={timeToLocalTime(
              d.departure_time,
              d.departure_timezone,
            )}
            price={getPrice(d.prices)}
          />
        ))
      ) : (
        <h4>Unlucky there is no trip for this location at this moment!</h4>
      )}
    </Container>
  );
};
