import React from 'react';
import mockedAxios from 'axios';
import { Provider } from 'react-redux';
import {
  render as rtlRender,
  waitForElement,
  wait,
  within,
  fireEvent
} from 'react-testing-library';
import App from './App';
import { configureStore } from '../store/configureStore';

const departures = [
  {
    busbud_departure_id: 1,
    departure_time: '2019-08-02T00:01:00',
    arrival_time: '2019-08-02T08:20:00',
    prices: {
      currency: 'USD',
      total: 7500
    },
    origin_location_id: 36102,
    destination_location_id: 1938
  },
  {
    busbud_departure_id: 2,
    departure_time: '2019-08-27T18:30:00',
    arrival_time: '2019-08-28T02:55:00',
    prices: {
      currency: 'USD',
      total: 7800
    },
    origin_location_id: 1942,
    destination_location_id: 1938
  }
];

const locations = [
  {
    id: 36102,
    name: 'George Washington Bridge'
  },
  {
    id: 1942,
    name: 'Port Authority Bus Terminal'
  },
  {
    id: 1938,
    name: "Gare d'autocars de Montréal"
  }
];

jest.mock('axios');

function render(component) {
  const store = configureStore();

  return rtlRender(<Provider store={store}>{component}</Provider>);
}

afterEach(() => {
  mockedAxios.request.mockReset();
});

it('renders and onboarding screen with hardcoded city names and date', async () => {
  mockedAxios.request.mockImplementation(() =>
    Promise.resolve({
      data: {
        departures,
        locations,
        complete: true
      }
    })
  );

  const { getByTestId } = render(<App />);

  const onboardingSection = getByTestId('onboarding');

  expect(within(onboardingSection).queryByText(/New York/)).toBeInTheDocument();

  expect(within(onboardingSection).queryByText(/Montreal/)).toBeInTheDocument();

  expect(within(onboardingSection).queryByText(/2019-08-02/)).toBeInTheDocument();

  expect(within(onboardingSection).queryByText(/Search/)).toBeInTheDocument();
});

it('renders a list of departures on search click when the data is cached on the api (complete is true)', async () => {
  mockedAxios.request.mockImplementation(() =>
    Promise.resolve({
      data: {
        departures,
        locations,
        complete: true
      }
    })
  );
  const { queryByText, getAllByTestId } = render(<App />);

  await wait();
  expect(mockedAxios.request).toHaveBeenCalledTimes(0);

  fireEvent.click(queryByText(/Search/i));

  const departuresItems = await waitForElement(() => getAllByTestId('departure-item'));

  expect(departuresItems).toHaveLength(2);

  expect(within(departuresItems[0]).queryByText(/12:01 am/)).toBeInTheDocument();
  expect(within(departuresItems[0]).queryByText(/8:20 am/)).toBeInTheDocument();

  expect(within(departuresItems[0]).queryByText(/George Washington Bridge/)).toBeInTheDocument();
  expect(within(departuresItems[0]).queryByText(/Gare d'autocars de Montréal/)).toBeInTheDocument();

  expect(within(departuresItems[0]).queryByText(/\$75/)).toBeInTheDocument();

  expect(within(departuresItems[1]).queryByText(/6:30 pm/)).toBeInTheDocument();
  expect(within(departuresItems[1]).queryByText(/2:55 am/)).toBeInTheDocument();

  expect(within(departuresItems[1]).queryByText(/Port Authority Bus Terminal/)).toBeInTheDocument();
  expect(within(departuresItems[1]).queryByText(/Gare d'autocars de Montréal/)).toBeInTheDocument();

  expect(within(departuresItems[1]).queryByText(/\$78/)).toBeInTheDocument();

  expect(mockedAxios.request).toHaveBeenCalledTimes(1);
});

it('polls the data when returned departure list is incomplete (complete is false)', async () => {
  mockedAxios.request
    .mockImplementationOnce(() => {
      return Promise.resolve({
        data: {
          departures: [],
          locations,
          complete: false
        }
      });
    })
    .mockImplementationOnce(() => {
      return Promise.resolve({
        data: {
          departures: [departures[0]],
          locations,
          complete: false
        }
      });
    })
    .mockImplementationOnce(() => {
      return Promise.resolve({
        data: {
          departures: [],
          locations,
          complete: false
        }
      });
    })
    .mockImplementationOnce(() => {
      return Promise.resolve({
        data: {
          departures: [departures[1]],
          locations,
          complete: true
        }
      });
    });

  const { queryByText, getAllByTestId, queryAllByTestId } = render(<App />);

  fireEvent.click(queryByText(/Search/i));

  await wait(() => expect(mockedAxios.request).toHaveBeenCalledTimes(1));

  expect(mockedAxios.request).toHaveBeenLastCalledWith(
    expect.objectContaining({
      url: 'dr5reg/f25dvk/2019-08-02',
      params: { adult: 1, child: 0, currency: 'usd', lang: 'us', senior: 0 }
    })
  );

  expect(queryAllByTestId('departure-item')).toHaveLength(0);

  const firstDepartureBatch = await waitForElement(() => getAllByTestId('departure-item'));

  expect(firstDepartureBatch).toHaveLength(1);
  expect(mockedAxios.request).toHaveBeenCalledTimes(2);

  expect(mockedAxios.request).toHaveBeenLastCalledWith(
    expect.objectContaining({
      url: 'dr5reg/f25dvk/2019-08-02/poll',
      params: { adult: 1, child: 0, currency: 'usd', lang: 'us', senior: 0, index: 0 }
    })
  );

  expect(within(firstDepartureBatch[0]).queryByText(/12:01 am/i)).toBeInTheDocument();
  expect(within(firstDepartureBatch[0]).queryByText(/8:20 am/i)).toBeInTheDocument();

  expect(
    within(firstDepartureBatch[0]).queryByText(/George Washington Bridge/i)
  ).toBeInTheDocument();
  expect(
    within(firstDepartureBatch[0]).queryByText(/Gare d'autocars de Montréal/i)
  ).toBeInTheDocument();
  expect(within(firstDepartureBatch[0]).queryByText(/\$75/)).toBeInTheDocument();

  await wait(() => expect(mockedAxios.request).toHaveBeenCalledTimes(3));

  expect(mockedAxios.request).toHaveBeenLastCalledWith(
    expect.objectContaining({
      url: 'dr5reg/f25dvk/2019-08-02/poll',
      params: { adult: 1, child: 0, currency: 'usd', lang: 'us', senior: 0, index: 1 }
    })
  );

  await wait(() => expect(mockedAxios.request).toHaveBeenCalledTimes(4));

  expect(mockedAxios.request).toHaveBeenLastCalledWith(
    expect.objectContaining({
      url: 'dr5reg/f25dvk/2019-08-02/poll',
      params: { adult: 1, child: 0, currency: 'usd', lang: 'us', senior: 0, index: 1 }
    })
  );

  const thirdDepartureBatch = getAllByTestId('departure-item');
  expect(thirdDepartureBatch).toHaveLength(2);

  expect(within(thirdDepartureBatch[1]).queryByText(/6:30 pm/i)).toBeInTheDocument();
  expect(within(thirdDepartureBatch[1]).queryByText(/2:55 am/i)).toBeInTheDocument();

  expect(
    within(thirdDepartureBatch[1]).queryByText(/Port Authority Bus Terminal/i)
  ).toBeInTheDocument();
  expect(
    within(thirdDepartureBatch[1]).queryByText(/Gare d'autocars de Montréal/i)
  ).toBeInTheDocument();

  expect(within(thirdDepartureBatch[1]).queryByText(/\$78/)).toBeInTheDocument();

  expect(mockedAxios.request).toHaveBeenCalledTimes(4);
});
