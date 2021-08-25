import { GetServerSideProps } from 'next';
import { useState, useEffect, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { useQuery } from 'react-query';

import { publicRuntimeConfig } from 'configs/envs';
import { Search, SearchResponse } from 'domains/search';
import { Item } from 'domains/departure';
import { Header, Card } from 'components';

import { api } from 'client';

type Props = {
  locale: string
  origin: string
  destination: string
  outboundDate: string
  adults: string
  searchResponse: SearchResponse
}

const DeparturesPage: React.VFC<Props> = ({
  locale,
  origin,
  destination,
  outboundDate,
  adults,
  searchResponse: initialSearchResponse,
}) => {
  const t = useTranslations('Search');
  const [searchResponse, setSearchResponse] = useState(initialSearchResponse);
  const [pollingEnabled, setPollingEnabled] = useState(!searchResponse.complete);
  const getDeparturesPoll = () => Search.getDeparturesPoll(
    origin,
    destination,
    outboundDate,
    adults,
    searchResponse.departures.length,
  );
  const { data: searchPollResponse, isLoading } = useQuery('search', getDeparturesPoll, {
    enabled: pollingEnabled,
    refetchInterval: publicRuntimeConfig.POLLING_INTERVAL,
    refetchOnMount: false,
  });

  useEffect(() => {
    if (!searchPollResponse || searchPollResponse.complete === true) {
      setPollingEnabled(false);
    } else if (searchPollResponse) {
      const newSearchResponse = Search.withAddedPolling(searchResponse, searchPollResponse);
      setSearchResponse(newSearchResponse);
    }
  }, [searchResponse, searchPollResponse]);

  const departures = useMemo(() => {
    const search = Search.fromApi(searchResponse);
    return search.departures.map((departure) => departure.getDepartureItem(locale));
  }, [searchResponse, locale]);

  if (departures.length === 0 && !isLoading) {
    return (
      <div>
        <Header />
        <div className="container mx-auto max-w-screen-lg">
          <Card>
            <p className="text-gray-400 font-bold">{t('emptyStateTitle')}</p>
            <p className="text-gray-400">{t('emptyStateDescription')}</p>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className="container mx-auto max-w-screen-lg">
        {/* TODO show date formatted in description */}
        <p className="mb-4 text-lg text-gray-400">{t('description')}</p>
        {departures.length > 0 && departures.map((departure) => (
          <div key={departure.id} className="mb-4">
            <Card>
              <Item departure={departure} />
            </Card>
          </div>
        ))}
        {isLoading && (
          <div>{t('loadingStateDescription')}</div>
        )}
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
    adults,
  } = context.query;

  if (typeof origin !== 'string'
    || typeof destination !== 'string'
    || typeof outboundDate !== 'string'
    || typeof adults !== 'string'
  ) {
    return {
      props: { locale, messages },
      notFound: true,
    };
  }

  const { data: searchResponse } = await api.get<
    SearchResponse
  >(`/x-departures/${origin}/${destination}/${outboundDate}?adult=${adults}`);

  return {
    props: {
      locale,
      messages,
      origin,
      destination,
      outboundDate,
      adults,
      searchResponse,
    },
  };
};

export default DeparturesPage;
