/**
 * Test the HomePage
 */

import React from 'react';
import { render } from 'react-testing-library';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { browserHistory } from 'react-router-dom';

import { HomePage, mapDispatchToProps } from '../index';
import { changeSearchParams, loadDepartures } from '../../App/store/actions';
import configureStore from '../../../configureStore';
import { MONTREAL, QUEBEC } from '../../App/constants';

describe('<HomePage />', () => {
  let store;

  beforeAll(() => {
    store = configureStore(
      {
        global: {
          searchParams: {
            origin: QUEBEC,
            destination: MONTREAL,
            outboundDate: '2020-12-14T14:21:30.490Z',
            adult: 1,
          },
        },
      },
      browserHistory,
    );
  });

  beforeEach(() => {
    window.Headers = jest.fn();
  });

  it('should render and match the snapshot', () => {
    const searchParams = {
      origin: QUEBEC,
      destination: MONTREAL,
      outboundDate: '2020-12-14T14:21:30.490Z',
      adult: 1,
    };
    const submitSpy = jest.fn();
    const {
      container: { firstChild },
    } = render(
      <Provider store={store}>
        <IntlProvider locale="en">
          <HomePage
            loading={false}
            error={false}
            departures={[]}
            searchParams={searchParams}
            onSubmitForm={submitSpy}
          />
        </IntlProvider>
      </Provider>,
    );
    expect(firstChild).toMatchSnapshot();
  });

  it('should fetch the departures on mount', () => {
    const submitSpy = jest.fn();
    const searchParams = {
      origin: 'quebec',
      destination: 'montreal',
      outboundDate: '2020-12-13',
      adult: 1,
    };

    render(
      <Provider store={store}>
        <IntlProvider locale="en">
          <HomePage
            searchParams={searchParams}
            onchangeSearchParams={() => {}}
            onSubmitForm={submitSpy}
          />
        </IntlProvider>
      </Provider>,
    );
    expect(submitSpy).toHaveBeenCalled();
  });

  describe('mapDispatchToProps', () => {
    describe('onSubmitForm', () => {
      it('should be injected', () => {
        const dispatch = jest.fn();
        const result = mapDispatchToProps(dispatch);
        expect(result.onSubmitForm).toBeDefined();
      });

      it('should dispatch loadDepartures when called', () => {
        const dispatch = jest.fn();
        const result = mapDispatchToProps(dispatch);
        const searchParams = {
          origin: 'quebec',
          destination: 'montreal',
          outboundDate: '2020-12-13',
          adult: 1,
        };

        result.onSubmitForm(searchParams);
        expect(dispatch).toHaveBeenCalledWith(changeSearchParams(searchParams));
        expect(dispatch).toHaveBeenCalledWith(loadDepartures());
      });

      it('should not dispatch changeSearchParams and loadDepartures when searchParams is not passed', () => {
        const dispatch = jest.fn();
        const result = mapDispatchToProps(dispatch);
        result.onSubmitForm();
        expect(dispatch).not.toHaveBeenCalledWith(changeSearchParams(null));
        expect(dispatch).not.toHaveBeenCalledWith(loadDepartures());
      });
    });
  });
});
