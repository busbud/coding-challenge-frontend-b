import { GetServerSideProps } from 'next';
import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useQuery } from 'react-query';

import { Search, SearchResponse } from 'domains/search';
import { Header } from 'components/header';

type DeparturesPageProps = {
  origin: string
  destination: string
  outboundDate: string
  searchResponse: SearchResponse
}

const DeparturesPage: React.VFC<DeparturesPageProps> = ({
  origin,
  destination,
  outboundDate,
  searchResponse,
}) => {
  const t = useTranslations('Search');
  const [pollingEnabled, setPollingEnabled] = useState(true);
  const getDeparturesPoll = () => Search.getDeparturesPoll(origin, destination, outboundDate);
  const { data: searchPoll } = useQuery('search', getDeparturesPoll, {
    enabled: pollingEnabled,
    refetchInterval: 2000,
    refetchOnMount: false,
  });

  useEffect(() => {
    const complete = searchPoll?.complete;
    if (complete === true) {
      setPollingEnabled(false);
    }
  }, [searchPoll]);

  const search = Search.fromApi(searchResponse);
  console.log(search);

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

      <div>Response:</div>
      <pre>{JSON.stringify(search, null, 2)}</pre>

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

  const { origin, destination, outbound_date: outboundDate } = context.query;

  if (typeof origin !== 'string' || typeof destination !== 'string' || typeof outboundDate !== 'string') {
    return {
      props: { messages },
      notFound: true,
    };
  }

  const searchResponse = await Search.getSSRDepartures(origin, destination, outboundDate);
  // const searchResponse = { };

  return {
    props: {
      origin,
      destination,
      outboundDate,
      searchResponse,
      messages,
    },
  };
};

export default DeparturesPage;
