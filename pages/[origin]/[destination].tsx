import { GetServerSideProps } from 'next';

import { Search } from 'domains/search/search'

type DeparturesPageProps = {
  origin: string;
  destination: string,
  searchResponse: object // TODO define object
};

const DeparturesPage: React.VFC<DeparturesPageProps> = ({ origin, destination, searchResponse }) => {
  return (
    <div>
      <div>origin: {origin}</div>
      <div>destination: {destination}</div>
      <pre>{JSON.stringify(searchResponse, null, 2)}</pre>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { origin, destination } = context.query;

  if (typeof origin !== 'string' || typeof destination !== 'string') {
    return {
      props: {},
      notFound: true,
    };
  }

  const outbound_date = '2021-08-21'
  const searchResponse = await Search.getSSRDeparture(origin, destination, outbound_date)
  console.log(searchResponse.data);
  return { props: { origin, destination, searchResponse: searchResponse.data }}
}

export default DeparturesPage
