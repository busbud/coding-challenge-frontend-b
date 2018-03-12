import axios from 'axios';

import { pollWhenNotComplete, addPathParametersToURL, generateXDeparturesURL, request } from '../index';

import { BASE_URL, ACCEPT } from '../constants';

jest.mock('axios', () => ({
  get: jest.fn(),
  defaults: {
    baseURL: null,
    headers: {
      common: {
        Accept: null,
        'X-Busbud-Token': null,
      },
    },
  },
}));

describe('services | api', () => {
  describe('axios defaults', () => {
    it('should have correct default options', () => {
      expect(axios.defaults.baseURL).toBe(BASE_URL);
      expect(axios.defaults.headers.common['Accept']).toBe(ACCEPT);
    });
  });
  describe('pollWhenNotComplete', () => {
    describe('when complete property from previous request is null', () => {
      it('should return an empty string', () => {
        // given
        const props = {
          complete: null,
        };

        // when
        const result = pollWhenNotComplete(props);

        // then
        const expected = '';
        expect(result).toBe(expected);
      });
    });
    describe('when complete property from previous request is true', () => {
      it('should return an empty string', () => {
        // given
        const props = {
          complete: true,
        };

        // when
        const result = pollWhenNotComplete(props);

        // then
        const expected = '';
        expect(result).toBe(expected);
      });
    });
    describe('when complete property from previous request is false', () => {
      it('should return the additional path to be added', () => {
        // given
        const props = {
          complete: false,
        };

        // when
        const result = pollWhenNotComplete(props);

        // then
        const expected = '/poll';
        expect(result).toBe(expected);
      });
    });
  });
  describe('addPathParametersToURL', () => {
    it('should return the proper fragment of xDepartures URL according to path provided', () => {
      // given
      const path = {
        origin: 'fakeOrigin',
        destination: 'fakeDestination',
        outbound_date: 'fakeOutboundDate',
      };

      // when
      const result = addPathParametersToURL(path);

      // then
      const expected = 'x-departures/fakeOrigin/fakeDestination/fakeOutboundDate';
      expect(result).toBe(expected);
    });
  });
  describe('generateXDeparturesURL', () => {
    it('should return generate xDepartures URL according to provided params', () => {
      // given
      const path = {
        origin: 'fakeOrigin',
        destination: 'fakeDestination',
        outbound_date: 'fakeOutboundDate',
      };
      const complete = false;

      // when
      const result = generateXDeparturesURL({ ...path, complete });

      // then
      const expected = 'x-departures/fakeOrigin/fakeDestination/fakeOutboundDate/poll';
      expect(result).toBe(expected);
    });
  });

  describe('request', () => {
    it('should make a GET request with proper params', () => {
      // given
      const url = 'fakeURL';
      const params = {
        fakeKey: 'fakeValue',
      };

      // when
      request(url, params);

      // then
      expect(axios.get).toHaveBeenCalledWith(url, { params });
    });
  });
});
