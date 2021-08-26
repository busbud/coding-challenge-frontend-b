import { render, screen } from '@testing-library/react';

import { Item } from 'domains/departure';
import { departureItemBuilder } from 'domains/departure/mocks';

describe('Item', () => {
  it('should render departure information', () => {
    const departureItem = departureItemBuilder();
    render(<Item departure={departureItem} />);

    const departureTime = screen.getByText(departureItem.departureTime);
    expect(departureTime).toBeInTheDocument();

    const arrivalTime = screen.getByText(departureItem.arrivalTime);
    expect(arrivalTime).toBeInTheDocument();

    const originLocation = screen.getByText(departureItem.originLocation.name);
    expect(originLocation).toBeInTheDocument();

    const destinationLocation = screen.getByText(departureItem.destinationLocation.name);
    expect(destinationLocation).toBeInTheDocument();

    const originLocationCity = screen.getByText(departureItem.originLocation.city.name);
    expect(originLocationCity).toBeInTheDocument();

    const destinationLocationCity = screen.getByText(departureItem.destinationLocation.city.name);
    expect(destinationLocationCity).toBeInTheDocument();

    const price = screen.getByText(departureItem.price);
    expect(price).toBeInTheDocument();
  });
});
