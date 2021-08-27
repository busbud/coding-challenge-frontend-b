import { GetServerSideProps } from 'next';
import Head from 'next/head';

import { SearchResponse, SearchProvider, List } from 'domains/search';
import { Header } from 'components';

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
  searchResponse: searchInitialResponse,
}) => (
  <div>
    <Head>
      <title>Osheaga</title>
    </Head>
    <Header />
    <SearchProvider
      locale={locale}
      origin={origin}
      destination={destination}
      outboundDate={outboundDate}
      adults={adults}
      searchInitialResponse={searchInitialResponse}
    >
      <div className="container mx-auto max-w-screen-lg">
        <List />
      </div>
    </SearchProvider>
  </div>
);

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
