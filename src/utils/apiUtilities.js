import axios from 'axios';

const apBaseUrl = process.env.REACT_APP_BUSBUD_API_BASE_URL;
const apiToken = process.env.REACT_APP_BUSBUD_API_TOKEN;

export const getDeparturesSearchUrl = ({
  filters,
  poll,
}) => `${apBaseUrl}/x-departures/${filters.origin}/${filters.destination}/${filters.outboundDate}${poll ? '/poll' : ''}`;

export const getDeparturesSearchRequest = ({
  filters, poll, locale,
}) => axios.get(getDeparturesSearchUrl({
  filters, poll,
}), {
  params: {
    adult: filters.adult,
    child: filters.child,
    senior: filters.senior,
    lang: locale,
  },
  headers: {
    Accept: 'application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/',
    'X-Busbud-Token': apiToken,
  },
});
