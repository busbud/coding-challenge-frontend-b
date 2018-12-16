import { cloneableGenerator } from 'redux-saga/utils';
import { select, call, put } from 'redux-saga/effects';

import { Api } from '../../../helpers/ApiFactory';

import { searchInfos, apiResult } from '../fixtures';
import { buildUrl } from '../helpers';

import { ApiConfiguration } from '../../../configuration';
import * as ActionTypes from '../actionTypes';
import * as ActionCreators from '../actionCreators';
import { getsearchQuery } from '../selectors';

import * as Sagas from '../sagas';

describe('search Saga', () => {
  describe('initSearchWorker', () => {
    it('should init search', () => {
      const action = {
        payload: searchInfos,
      };

      const { travellers, locations, departureDate } = searchInfos;

      const { adult: adultCount, child: childCount, senior: seniorCount } = travellers;
      const { departure, arrival } = locations;
      const url = buildUrl({
        adultCount,
        childCount,
        seniorCount,
        originGeohash: departure.geoHash,
        arrivalGeohash: arrival.geoHash,
        outboundDate: departureDate,
      });
      const gen = cloneableGenerator(Sagas.initSearchWorker)(action);
      expect(gen.next().value).toEqual(
        call(Api, url, {
          method: 'GET',
        }),
      );

      const clone = gen.clone();

      expect(clone.next(apiResult).value).toEqual(put(ActionCreators.dispatchResult(apiResult)));
    });

    it('should get results without search filter', () => {
      const searchQuery = {
        filter: 'all',
        value: 'toto',
      };
      const action = {
        payload: searchQuery,
      };
      const gen = cloneableGenerator(Sagas.getResultsWorker)(action);
      gen.next();

      const generator = gen.next(searchQuery);

      expect(generator.value).toEqual(
        call(
          sagaRequest,
          ActionTypes.PERFORM_SEARCH,
          `${ApiConfiguration.search}q=${searchQuery.value}&page=1`,
          {
            method: 'GET',
          },
        ),
      );
    });

    it('should get results with  filter', () => {
      const searchQuery = {
        filter: 'author',
        value: 'toto la mancha',
      };
      const action = {
        payload: searchQuery,
      };

      const gen = cloneableGenerator(Sagas.getResultsWorker)(action);
      gen.next();

      const generator = gen.next(searchQuery);
      expect(generator.value).toEqual(
        call(
          sagaRequest,
          ActionTypes.PERFORM_SEARCH,
          `${ApiConfiguration.search}${searchQuery.filter}=${searchQuery.value.replace(
            ' ',
            '+',
          )}&page=1`,
          {
            method: 'GET',
          },
        ),
      );
    });
  });
});
