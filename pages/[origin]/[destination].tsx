import { GetServerSideProps } from 'next';
import { useState, useEffect, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { useQuery } from 'react-query';

import { Search, SearchResponse } from 'domains/search';
import { Item } from 'domains/departure';
import { Header, Card } from 'components';

import { api } from 'client';

type DeparturesPageProps = {
  locale: string
  origin: string
  destination: string
  outboundDate: string
  searchResponse: SearchResponse
}

const DeparturesPage: React.VFC<DeparturesPageProps> = ({
  locale,
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

  const departures = useMemo(() => {
    const search = Search.fromApi(searchResponse);
    return search.departures.map((departure) => departure.getDepartureItem(locale));
  }, [searchResponse, locale]);

  return (
    <div>
      <Header />
      <h1>{t('title')}</h1>
      <div className="container mx-auto">
        {departures.map((departure) => (
          <div key={departure.id} className="mb-4">
            <Card>
              <Item departure={departure} />
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { locale } = context;
  const messages = {
    ...require(`messages/[origin]/[destination]/${locale}.json`),
    ...require(`messages/shared/${locale}.json`),
  };

  const {
    origin,
    destination,
    outbound_date: outboundDate,
  } = context.query; // TODO insert adult query

  if (typeof origin !== 'string' || typeof destination !== 'string' || typeof outboundDate !== 'string') {
    return {
      props: { locale, messages },
      notFound: true,
    };
  }

  const { data: searchResponse } = await api.get<
    SearchResponse
  >(`/x-departures/${origin}/${destination}/${outboundDate}`);

  return {
    props: {
      locale,
      messages,
      origin,
      destination,
      outboundDate,
      searchResponse,
    },
  };
};

export default DeparturesPage;
