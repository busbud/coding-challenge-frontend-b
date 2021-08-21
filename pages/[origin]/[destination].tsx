import { GetServerSideProps } from 'next';
import { useState, useEffect } from 'react';
import { useQuery } from 'react-query';

import { Search } from 'domains/search/search';

type DeparturesPageProps = {
  origin: string;
  destination: string,
  outboundDate: string,
  searchResponse: object, // TODO define object
};

const DeparturesPage: React.VFC<DeparturesPageProps> = ({
  origin,
  destination,
  outboundDate,
  searchResponse,
}) => {
  const [pollingEnabled, setPollingEnabled] = useState(true);
  const getDeparturesPoll = () => Search.getDeparturesPoll(origin, destination, outboundDate);
  const { data } = useQuery('search', getDeparturesPoll, {
    enabled: pollingEnabled,
    refetchInterval: 2000,
    refetchOnMount: false,
  });

  useEffect(() => {
    const complete = data?.complete;
    setPollingEnabled(!complete);
  }, [data]);

  return (
    <div>
      <div>
        origin:
        {origin}
      </div>
      <div>
        destination:
        {destination}
      </div>
      {/* <div>
        {searchResponse.departures.map((departure, index) => {
          const { arrival_time: arrivalTime } = departure;
          return (
            <div key={index}>
              arrival_time[
              {index}
              ]:
              {' '}
              {arrivalTime}
            </div>
          );
        })}
      </div> */}

      <div>Full response:</div>
      <pre>{JSON.stringify(searchResponse, null, 2)}</pre>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { origin, destination } = context.query;

  if (typeof origin !== 'string' || typeof destination !== 'string') {
    return {
      props: {},
      notFound: true,
    };
  }

  const outboundDate = '2021-08-21';
  // const searchResponse = await Search.getSSRDepartures(origin, destination, outboundDate);
  const searchResponse = { data: {} };
  // console.log(searchResponse.data); // TODO remove this
  return {
    props: {
      origin, destination, outboundDate, searchResponse: searchResponse.data,
    },
  };
};

export default DeparturesPage;
