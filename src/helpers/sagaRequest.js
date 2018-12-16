import { request } from 'redux-saga-request';
import { Api } from './ApiFactory';


export function* sagaRequest(Action, url, config, meta = undefined) {
  return yield request(Action, [Api, url, config], meta);
}
