import { delay } from 'redux-saga';
import { put, select, call } from 'redux-saga/effects';
import takeFirst from '../../../utils/takeFirst';
import { FETCH_DEPARTURES } from '../constants';
import { fetchDeparturesSuccess, fetchDeparturesError, fetchDeparturesComplete } from '../actions';
import { makeSelectQuery, makeSelectComplete } from '../selectors';
import { fetchXDepartures } from '../../../services/api';
import root, { fetchDepartures, POOLING_DELAY } from '../sagas';

jest.mock('../../../utils/takeFirst', () => jest.fn());
jest.mock('../selectors', () => {
  function mockedMakeSelectQuery() {}
  function mockedMakeSelectComplete() {}
  return {
    makeSelectQuery: () => mockedMakeSelectQuery,
    makeSelectComplete: () => mockedMakeSelectComplete,
  };
});

describe('containers | App | sagas', () => {
  describe('fetchDepartures', () => {
    it('should select path and query to process the request against', () => {
      // given
      const generator = fetchDepartures();

      // when
      const descriptor = generator.next().value;

      // then
      expect(descriptor).toEqual(select(makeSelectQuery()));
    });

    it('should call api with proper params in order to fetch departures', () => {
      // given
      const generator = fetchDepartures();
      const query = { path: 'fakePath', params: 'fakeParams' };
      const complete = null;

      // when
      generator.next();
      const descriptor = generator.next(query).value;

      // then
      expect(descriptor).toEqual(call(fetchXDepartures, query.path, query.params, complete));
    });

    it('should update store with api response', () => {
      // given
      const generator = fetchDepartures();
      const query = { path: 'fakePath', params: 'fakeParams' };
      const response = { data: 'fakeData' };
      // when
      generator.next();
      generator.next(query);
      const descriptor = generator.next(response).value;

      // then
      expect(descriptor).toEqual(put(fetchDeparturesSuccess(response.data)));
    });

    it('should check if request is completly proccessed', () => {
      // given
      const generator = fetchDepartures();
      const query = { path: 'fakePath', params: 'fakeParams' };
      const response = { data: 'fakeData' };
      // when
      generator.next();
      generator.next(query);
      generator.next(response);
      const descriptor = generator.next().value;

      // then
      expect(descriptor).toEqual(select(makeSelectComplete()));
    });

    it('should delay next yield execution', () => {
      // given
      const generator = fetchDepartures();
      const query = { path: 'fakePath', params: 'fakeParams' };
      const response = { data: 'fakeData' };
      // when
      generator.next();
      generator.next(query);
      generator.next(response);
      generator.next();
      const descriptor = generator.next().value;

      // then
      expect(descriptor).toEqual(call(delay, POOLING_DELAY));
    });
    describe('when pooling is not complete', () => {
      it('should process a new request', () => {
        // given
        const generator = fetchDepartures();
        const query = { path: 'fakePath', params: 'fakeParams' };
        const response = { data: 'fakeData' };
        const complete = false;

        // when
        generator.next();
        generator.next(query);
        generator.next(response);
        generator.next();
        generator.next(complete);
        const descriptor = generator.next().value;

        // then
        expect(descriptor).toEqual(call(fetchXDepartures, query.path, query.params, complete));
      });
    });
    describe('when pooling is complete', () => {
      it('should notify store that pooling departures is completed', () => {
        // given
        const generator = fetchDepartures();
        const query = { path: 'fakePath', params: 'fakeParams' };
        const response = { data: 'fakeData' };
        const complete = true;

        // when
        generator.next();
        generator.next(query);
        generator.next(response);
        generator.next();
        generator.next(complete);
        const descriptor = generator.next().value;

        // then
        expect(descriptor).toEqual(put(fetchDeparturesComplete()));
      });
      it('should terminate the saga', () => {
        // given
        const generator = fetchDepartures();
        const query = { path: 'fakePath', params: 'fakeParams' };
        const response = { data: 'fakeData' };
        const complete = true;

        // when
        generator.next();
        generator.next(query);
        generator.next(response);
        generator.next();
        generator.next(complete);
        generator.next();

        // then
        const { done } = generator.next();

        // then
        expect(done).toBe(true);
      });
    });
    describe('when an error is thrown', () => {
      it('should notify store regarding the error', () => {
        // given
        const generator = fetchDepartures();
        const query = { path: 'fakePath', params: 'fakeParams' };
        const error = new Error('Some Error');

        // when
        generator.next();
        generator.next(query);
        const descriptor = generator.throw(error).value;

        // then
        expect(descriptor).toEqual(put(fetchDeparturesError()));
      });
      it('should notify store that pooling departures is completed', () => {
        // given
        const generator = fetchDepartures();
        const query = { path: 'fakePath', params: 'fakeParams' };
        const error = new Error('Some Error');

        // when
        generator.next();
        generator.next(query);
        generator.throw(error);
        const descriptor = generator.next().value;

        // then
        expect(descriptor).toEqual(put(fetchDeparturesComplete()));
      });
      it('should terminate the saga', () => {
        // given
        const generator = fetchDepartures();
        const query = { path: 'fakePath', params: 'fakeParams' };
        const error = new Error('Some Error');

        // when
        generator.next();
        generator.next(query);
        generator.throw(error);
        generator.next();
        const { done } = generator.next();

        // then
        expect(done).toBe(true);
      });
    });
  });
  describe('root', () => {
    it('should watch and execute first FETCH_DEPARTURES', () => {
      // given
      const generator = root();

      // when
      generator.next();

      // then
      expect(takeFirst).toHaveBeenCalledWith(FETCH_DEPARTURES, fetchDepartures);
    });
  });
});
