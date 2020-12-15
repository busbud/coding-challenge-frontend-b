import React from 'react';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { browserHistory } from 'react-router-dom';
import { render } from 'react-testing-library';

import DeparturesList from '../index';
import configureStore from '../../../configureStore';
import { MONTREAL, QUEBEC } from '../../../containers/App/constants';

describe('<DeparturesList />', () => {
  it('should render the loading indicator when its loading', () => {
    const { container } = render(<DeparturesList loading />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render an error if loading failed', () => {
    const { queryByText } = render(
      <IntlProvider locale="en">
        <DeparturesList
          loading={false}
          error={{ message: 'Loading failed!' }}
        />
      </IntlProvider>,
    );
    expect(queryByText(/Something went wrong/)).not.toBeNull();
  });

  it('should render the departures if loading was successful', () => {
    const store = configureStore(
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
    const departures = [
      {
        departure_time: '2020-12-13 09:10:00',
        arrival_time: '2020-12-13 14:00:00',
        location: {
          id: 1,
          name: 'quebec',
        },
        price: 5520,
      },
    ];
    const { container } = render(
      <Provider store={store}>
        <IntlProvider locale="en">
          <DeparturesList departures={departures} error={false} />
        </IntlProvider>
      </Provider>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should not render anything if nothing interesting is provided', () => {
    const { container } = render(
      <DeparturesList departures={false} error={false} loading={false} />,
    );

    expect(container.firstChild).toBeNull();
  });
});
