import { GetServerSideProps } from 'next';
import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useQuery } from 'react-query';

import { Search } from 'domains/search/search';
import Header from 'components/Header';

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
  const t = useTranslations('Search');
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
      <Header />
      <h1>{t('title')}</h1>
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
  const { locale } = context;
  const messages = {
    ...require(`messages/[origin]/[destination]/${locale}.json`),
    ...require(`messages/shared/${locale}.json`),
  };

  const { origin, destination } = context.query;

  if (typeof origin !== 'string' || typeof destination !== 'string') {
    return {
      props: { messages },
      notFound: true,
    };
  }

  const outboundDate = '2021-08-21';
  // const searchResponse = await Search.getSSRDepartures(origin, destination, outboundDate);
  const searchResponse = { data: {} };
  // console.log(searchResponse.data); // TODO remove this
  return {
    props: {
      origin,
      destination,
      outboundDate,
      searchResponse: searchResponse.data,
      messages,
    },
  };
};

export default DeparturesPage;
