/**
 * Test the departure list item
 */

import React from 'react';
import { getByText, render } from 'react-testing-library';
import { IntlProvider } from 'react-intl';
import { formatTime } from 'utils/common';

import { DepartureListItem } from '../index';
import messages from '../messages';

const renderComponent = (props = {}) =>
  render(
    <IntlProvider locale="en">
      <DepartureListItem {...props} />
    </IntlProvider>,
  );

describe('<DepartureListItem />', () => {
  let searchParams;
  let item;

  // Before each test reset the item data for safety
  beforeEach(() => {
    searchParams = {
      adult: 1,
      origin: 'quebec',
      destination: 'montreal',
      outboundDate: '2020-12-14T14:30:12.149Z',
    };

    item = {
      arrival_time: '2020-12-14T14:15:00',
      departure_time: '2020-12-14T10:30:00',
      location: {
        id: 12189,
        city_id: '375dd587-9001-acbd-84a4-683deddcb1b1',
        name: 'Gare du Palais',
        address: ['320 Rue Abraham Martin', 'Québec, QC G1K 3X2', 'Canada'],
        type: 'bus_station',
      },
      price: 5524,
    };
  });

  it('should render a ListItem', () => {
    const { container } = renderComponent({ searchParams, item });
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render the departure city', () => {
    const { queryByText } = renderComponent({
      searchParams,
      item,
    });
    const origin = messages[searchParams.origin].defaultMessage;
    expect(queryByText(origin)).not.toBeNull();
  });

  it('should render the arrival city', () => {
    const { queryByText } = renderComponent({
      searchParams,
      item,
    });

    const destination = messages[searchParams.destination].defaultMessage;
    expect(queryByText(destination)).not.toBeNull();
  });

  it('should render the location name', () => {
    const { container } = renderComponent({ searchParams, item });
    expect(
      getByText(container, content => content.endsWith(item.location.name)),
    ).not.toBeNull();
  });

  it('should render the departure time', () => {
    const { container } = renderComponent({ searchParams, item });
    expect(
      getByText(container, formatTime(item.departure_time)),
    ).not.toBeNull();
  });

  it('should render the arrival time', () => {
    const { container } = renderComponent({ searchParams, item });
    expect(getByText(container, formatTime(item.arrival_time))).not.toBeNull();
  });
});
