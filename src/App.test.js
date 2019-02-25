import React from 'react';
import { render, waitForElement, within } from 'react-testing-library';
import App from './App';
import { getDepartures } from './api';

jest.mock('./api', () => {
  return {
    getDepartures: jest.fn(() =>
      Promise.resolve({
        departures: [
          {
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
            departure_time: '2019-09-27T18:30:00',
            arrival_time: '2019-09-28T02:55:00',
            prices: {
              currency: 'USD',
              total: 7800
            },
            origin_location_id: 1942,
            destination_location_id: 1938
          }
        ],
        locations: [
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
        ],
        complete: true
      })
    )
  };
});

it('should render a list of departures when it is cached on the api (complete is true)', async () => {
  const { queryByText, getAllByTestId } = render(<App />);

  await waitForElement(() => queryByText(/Loading departures/));

  const departures = await waitForElement(() =>
    getAllByTestId('departure-item')
  );

  expect(departures).toHaveLength(2);

  expect(within(departures[0]).queryByText(/12:01 am/)).toBeInTheDocument();
  expect(within(departures[0]).queryByText(/8:20 am/)).toBeInTheDocument();

  expect(
    within(departures[0]).queryByText(/George Washington Bridge/)
  ).toBeInTheDocument();
  expect(
    within(departures[0]).queryByText(/Gare d'autocars de Montréal/)
  ).toBeInTheDocument();

  expect(within(departures[0]).queryByText(/\$75/)).toBeInTheDocument();

  expect(within(departures[1]).queryByText(/6:30 pm/)).toBeInTheDocument();
  expect(within(departures[1]).queryByText(/2:55 am/)).toBeInTheDocument();

  expect(
    within(departures[1]).queryByText(/Port Authority Bus Terminal/)
  ).toBeInTheDocument();
  expect(
    within(departures[1]).queryByText(/Gare d'autocars de Montréal/)
  ).toBeInTheDocument();

  expect(within(departures[1]).queryByText(/\$78/)).toBeInTheDocument();
});
