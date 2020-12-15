import {
  selectGlobal,
  makeSelectSearchParams,
  makeSelectLoading,
  makeSelectError,
  makeSelectDepartures,
  makeSelectLocation,
} from '../selectors';

describe('selectGlobal', () => {
  it('should select the global state', () => {
    const globalState = {};
    const mockedState = {
      global: globalState,
    };
    expect(selectGlobal(mockedState)).toEqual(globalState);
  });
});

describe('makeSelectSearchParams', () => {
  const searchParamsSelector = makeSelectSearchParams();
  it('should select the search parameters', () => {
    const searchParams = {
      adult: 1,
      destination: 'montreal',
      origin: 'quebec',
      outboundDate: '2020-12-14T14:30:12.149Z',
    };

    const mockedState = {
      global: {
        searchParams,
      },
    };
    expect(searchParamsSelector(mockedState)).toEqual(searchParams);
  });
});

describe('makeSelectLoading', () => {
  const loadingSelector = makeSelectLoading();
  it('should select the loading', () => {
    const loading = false;
    const mockedState = {
      global: {
        loading,
      },
    };
    expect(loadingSelector(mockedState)).toEqual(loading);
  });
});

describe('makeSelectError', () => {
  const errorSelector = makeSelectError();
  it('should select the error', () => {
    const error = 404;
    const mockedState = {
      global: {
        error,
      },
    };
    expect(errorSelector(mockedState)).toEqual(error);
  });
});

describe('makeSelectDepartures', () => {
  const departuresSelector = makeSelectDepartures();
  it('should select the departures', () => {
    const departures = [];
    const mockedState = {
      global: {
        searchResult: {
          departures,
        },
      },
    };
    expect(departuresSelector(mockedState)).toEqual(departures);
  });
});

describe('makeSelectLocation', () => {
  const locationStateSelector = makeSelectLocation();
  it('should select the location', () => {
    const router = {
      location: { pathname: '/foo' },
    };
    const mockedState = {
      router,
    };
    expect(locationStateSelector(mockedState)).toEqual(router.location);
  });
});
