import { render, screen } from '@testing-library/react';
import { within } from '@testing-library/dom';
import FareCard from './FareCard';
import PropTypes from 'prop-types';

describe('<FareCard/> component', () => {
    let item;

    beforeEach(() => {
        item = {
            departure_time: '2022-11-11 14:30:00',
            arrival_time: '2022-11-11 15:00:00',
            id: '1111',
            arrival_location: 'gare central',
            departure_location: 'marine',
            total_price: 123,
            currency: 'CAD',
            departure_origin: 'mtl',
            arrival_origin: 'qc',
        };
    });

    it('should render departure information', () => {
        render(<FareCard {...item} />);
        const departureSection = screen.getByTestId('originSection');
        expect(within(departureSection).getByText('02:30 PM'));
        expect(within(departureSection).getByText('mtl'));
        expect(within(departureSection).getByText('marine'));
    });

    it('should render arrival information', () => {
        render(<FareCard {...item} />);
        const arrivalSection = screen.getByTestId('destinationSection');
        expect(within(arrivalSection).getByText('03:00 PM'));
        expect(within(arrivalSection).getByText('gare central'));
        expect(within(arrivalSection).getByText('qc'));
    });

    it('should render total', () => {
        render(<FareCard {...item} />);
        const priceSection = screen.getByTestId('totalPrice_1111');
        expect(within(priceSection).getByText('CA$123.00'));
    });
});
