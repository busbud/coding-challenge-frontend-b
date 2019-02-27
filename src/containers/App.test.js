import React from 'react';
import mockedAxios from 'axios';
import { Provider } from 'react-redux';
import {
  render as rtlRender,
  waitForElement,
  wait,
  within
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

it('should render a list of departures when it is cached on the api (complete is true)', async () => {
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

  await waitForElement(() => queryByText(/Loading departures/));

  const departuresItems = await waitForElement(() =>
    getAllByTestId('departure-item')
  );

  expect(departuresItems).toHaveLength(2);

  expect(
    within(departuresItems[0]).queryByText(/12:01 am/)
  ).toBeInTheDocument();
  expect(within(departuresItems[0]).queryByText(/8:20 am/)).toBeInTheDocument();

  expect(
    within(departuresItems[0]).queryByText(/George Washington Bridge/)
  ).toBeInTheDocument();
  expect(
    within(departuresItems[0]).queryByText(/Gare d'autocars de Montréal/)
  ).toBeInTheDocument();

  expect(within(departuresItems[0]).queryByText(/\$75/)).toBeInTheDocument();

  expect(within(departuresItems[1]).queryByText(/6:30 pm/)).toBeInTheDocument();
  expect(within(departuresItems[1]).queryByText(/2:55 am/)).toBeInTheDocument();

  expect(
    within(departuresItems[1]).queryByText(/Port Authority Bus Terminal/)
  ).toBeInTheDocument();
  expect(
    within(departuresItems[1]).queryByText(/Gare d'autocars de Montréal/)
  ).toBeInTheDocument();

  expect(within(departuresItems[1]).queryByText(/\$78/)).toBeInTheDocument();

  expect(mockedAxios.request).toHaveBeenCalledTimes(1);
});

it('should poll the data when returned departure list is incomplete (complete is false)', async () => {
  mockedAxios.request.mockImplementation(({ params: { index } }) => {
    return Promise.resolve({
      data: {
        departures: typeof index !== 'undefined' ? [departures[index]] : [],
        locations,
        complete: index === 1
      }
    });
  });

  const { queryByText, getAllByTestId, queryAllByTestId } = render(<App />);

  await waitForElement(() => queryByText(/Loading departures/));

  await wait();
  expect(queryAllByTestId('departure-item')).toHaveLength(0);
  expect(mockedAxios.request).toHaveBeenCalledTimes(1);

  const firstDepartureBatch = await waitForElement(() =>
    getAllByTestId('departure-item')
  );

  expect(firstDepartureBatch).toHaveLength(1);
  expect(mockedAxios.request).toHaveBeenCalledTimes(2);

  expect(
    within(firstDepartureBatch[0]).queryByText(/12:01 am/i)
  ).toBeInTheDocument();
  expect(
    within(firstDepartureBatch[0]).queryByText(/8:20 am/i)
  ).toBeInTheDocument();

  expect(
    within(firstDepartureBatch[0]).queryByText(/George Washington Bridge/i)
  ).toBeInTheDocument();
  expect(
    within(firstDepartureBatch[0]).queryByText(/Gare d'autocars de Montréal/i)
  ).toBeInTheDocument();
  expect(
    within(firstDepartureBatch[0]).queryByText(/\$75/)
  ).toBeInTheDocument();

  await wait();
  expect(queryAllByTestId('departure-item')).toHaveLength(1);
  expect(mockedAxios.request).toHaveBeenCalledTimes(2);

  await wait(() => expect(queryAllByTestId('departure-item')).toHaveLength(2));

  const secondDepartureBatch = getAllByTestId('departure-item');
  expect(secondDepartureBatch).toHaveLength(2);

  expect(
    within(secondDepartureBatch[1]).queryByText(/6:30 pm/i)
  ).toBeInTheDocument();
  expect(
    within(secondDepartureBatch[1]).queryByText(/2:55 am/i)
  ).toBeInTheDocument();

  expect(
    within(secondDepartureBatch[1]).queryByText(/Port Authority Bus Terminal/i)
  ).toBeInTheDocument();
  expect(
    within(secondDepartureBatch[1]).queryByText(/Gare d'autocars de Montréal/i)
  ).toBeInTheDocument();

  expect(
    within(secondDepartureBatch[1]).queryByText(/\$78/)
  ).toBeInTheDocument();

  expect(mockedAxios.request).toHaveBeenCalledTimes(3);
});
