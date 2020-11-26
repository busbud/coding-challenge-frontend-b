import { getDepartures } from '@root/api';
import { React, styled, LuxonDateTime, useQuery } from '@client/dependencies';
import { DisplayError } from '@client/error';
import { Loading } from '@client/loading';
import { DepartureList } from './list';
import { DepartureWelcome } from './welcome';

const Container = styled.section`
  display: block;
  margin: 0 auto;
  position: relative;
  min-height: 600px;

  @media (min-width: 1028px) {
    max-width: 1028px;
  }
  @media (max-width: 1028px) {
    margin: 0 1rem;
  }
`;

export const DepartureLanding = () => {
  const { isLoading, error, data } = useQuery('departures', () =>
    getDepartures({
      origin: 'f2m673' /* Quebec */,
      dest: 'f25dvk' /* Montreal */,
      date: LuxonDateTime.local().toFormat('yyyy-LL-dd'),
      adult: 1,
    }),
  );

  return (
    <Container>
      <Loading visible={isLoading} />
      <DepartureWelcome />
      {error && (
        <DisplayError title="Oh-uh cannot get departures!">
          {error && 'message' in (error as any) ? (
            (error as any).message
          ) : (
            <p>{JSON.stringify(error)}</p>
          )}
        </DisplayError>
      )}
      <DepartureList departures={data}>
        <h3>
          Today trips from {'Quebec'} to {'Montreal'} for 1 Adult
        </h3>
      </DepartureList>
    </Container>
  );
};
