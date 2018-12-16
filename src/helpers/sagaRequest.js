import { Api } from './ApiFactory';

import { request } from 'redux-saga-request';

export function* sagaRequest(Action, url, config, meta = undefined) {
  return yield request(Action, [Api, url, config], meta);
}
