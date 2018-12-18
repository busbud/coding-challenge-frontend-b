import { cloneableGenerator } from 'redux-saga/utils';
import { call, put } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import set from 'lodash/fp/set';

import getOr from 'lodash/fp/getOr';

import { Api } from '../../../helpers/ApiFactory';

import { searchInfos, apiResult } from '../fixtures';
import { buildUrl } from '../helpers';

import * as ActionCreators from '../actionCreators';

import * as Sagas from '../sagas';

describe('search Saga', () => {
  it('search should succucceed without polling', () => {
    const action = {
      payload: searchInfos,
    };

    const url = buildUrl(searchInfos);
    const generator = cloneableGenerator(Sagas.initSearchWorker)(action);

    expect(generator.next().value).toEqual(put(ActionCreators.onSearchStarted(searchInfos)));

    const clone = generator.clone();

    expect(clone.next(apiResult).value).toEqual(
      call(Api, url, {
        method: 'GET',
      }),
    );
    expect(clone.next(apiResult).value).toEqual(put(ActionCreators.dispatchResult(apiResult)));
    expect(clone.next().value).toEqual(put(ActionCreators.onSearchSucceed()));
    expect(clone.next().done).toEqual(true);
  });

  it('should should succeed after polling', () => {
    const uncompletedApiResult = set('complete', false, apiResult);
    const action = {
      payload: searchInfos,
    };

    const url = buildUrl(searchInfos);
    const pollingUrl = buildUrl({ ...searchInfos, pollingUrl: true });
    const generator = cloneableGenerator(Sagas.initSearchWorker)(action);

    expect(generator.next().value).toEqual(put(ActionCreators.onSearchStarted(searchInfos)));

    const clone = generator.clone();

    expect(clone.next(apiResult).value).toEqual(
      call(Api, url, {
        method: 'GET',
      }),
    );
    let index = getOr(0, 'departures.length', uncompletedApiResult);

    expect(clone.next(uncompletedApiResult).value).toEqual(
      put(ActionCreators.dispatchResult(uncompletedApiResult)),
    );

    expect(clone.next().value).toEqual(call(delay, 3000));
    expect(clone.next().value).toEqual(
      call(Api, `${pollingUrl}&index=${index}`, {
        method: 'GET',
      }),
    );
    expect(clone.next(uncompletedApiResult).value).toEqual(
      put(ActionCreators.dispatchPartialResult(uncompletedApiResult)),
    );

    index += getOr(0, 'departures.length', uncompletedApiResult);
    expect(clone.next().value).toEqual(call(delay, 3000));

    expect(clone.next().value).toEqual(
      call(Api, `${pollingUrl}&index=${index}`, {
        method: 'GET',
      }),
    );
    expect(clone.next(uncompletedApiResult).value).toEqual(
      put(ActionCreators.dispatchPartialResult(uncompletedApiResult)),
    );

    index += getOr(0, 'departures.length', uncompletedApiResult);
    expect(clone.next().value).toEqual(call(delay, 3000));

    expect(clone.next().value).toEqual(
      call(Api, `${pollingUrl}&index=${index}`, {
        method: 'GET',
      }),
    );

    expect(clone.next(apiResult).value).toEqual(
      put(ActionCreators.dispatchPartialResult(apiResult)),
    );
    expect(clone.next().value).toEqual(put(ActionCreators.onSearchSucceed()));
    expect(clone.next().done).toEqual(true);
  });
});
