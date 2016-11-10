import { Promise } from 'es6-promise';
import fetchPonyfill from 'fetch-ponyfill';

const { fetch } = fetchPonyfill({ Promise });

export default fetch;
