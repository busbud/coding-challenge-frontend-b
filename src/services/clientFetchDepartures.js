// client fetch to server
import path from 'path';
import qs from 'qs';

import fetch from './fetch';

const fetchDepartures = ({
  origin,
  destination,
  outboundDate,
  adult=0,
  child=0,
  senior=0,
  lang,
  currency,
  index,
}) => fetch(
  path.join('/departures', origin, destination, outboundDate) +
  '?' + qs.stringify({ adult, child, senior, lang, currency, index })
).then(res => res.json());

module.exports = fetchDepartures;
