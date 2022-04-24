import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import * as departureAPI from '../../apiClient/departures';
import * as numberUtils from '../../utils/number.utils';
import Search from './Search';

jest.mock('../../apiClient/departures');
jest.mock('../../utils/number.utils');
jest.mock('../../businessComponents/FareCard/FareCard', () => ({ id }) => <div>{id}</div>);

describe('<Search> component', () => {
    beforeEach(() => {
        numberUtils.formatCurrency.mockReturnValue('20CAD');
    });

    afterEach(() => {
        numberUtils.formatCurrency.mockClear();
    });

    it('should render `Traveling...` text', () => {
        render(<Search />);
        const headerText = screen.getByTestId('header_text');
        expect(headerText).toBeInTheDocument();
        expect(headerText).toHaveTextContent(
            /Traveling from Quebec to Montreal on August 1, 2022/i
        );
    });

    it('should render `Search` button', () => {
        render(<Search />);
        const button = screen.getByRole('button');
        expect(button).toBeInTheDocument();
    });

    describe('when Search button is clicked', () => {
        beforeEach(() => {
            departureAPI.getDepartures.mockResolvedValue({ departures: [{ id: 1 }] });
        });

        it('should show loading state when button is clicked', () => {
            render(<Search />);
            const button = screen.getByRole('button');
            act(() => {
                userEvent.click(button);
            });

            const loader = screen.getByAltText('Dancing person loader');
            expect(loader).toBeInTheDocument();
        });

        it('should not show the Search button while loading', async () => {
            render(<Search />);
            const button = screen.getByRole('button');
            await act(() => {
                userEvent.click(button);
            });

            expect(button).not.toBeInTheDocument();
        });

        it('should pass options to a request', async () => {
            render(<Search />);
            const button = screen.getByRole('button');
            await act(() => {
                userEvent.click(button);
            });

            await departureAPI.getDepartures.mockResolvedValue({ departures: [{ id: 1 }] });
            expect(departureAPI.getDepartures).toHaveBeenCalledWith({
                adult: 1,
                child: 0,
                senior: 0,
                lang: 'en',
                currency: 'CAD',
                departure_date: '2022-08-01',
                departure_origin: 'Quebec',
                arrival_origin: 'Montreal',
            });
        });

        describe('when request resolves', () => {
            beforeEach(() => {
                departureAPI.getDepartures.mockResolvedValue({
                    departures: [
                        {
                            id: 1,
                            arrival_time: '2022-07-01T10:45:00',
                            departure_time: ' 2022-07-01T10:45:00',
                        },
                        {
                            id: 2,
                            arrival_time: '2022-07-01T10:45:00',
                            departure_time: ' 2022-07-01T10:45:00',
                        },
                        {
                            id: 3,
                            arrival_time: '2022-07-01T10:45:00',
                            departure_time: ' 2022-07-01T10:45:00',
                        },
                    ],
                });
            });

            it('should not show loading state', async () => {
                render(<Search />);
                const button = screen.getByRole('button');
                await act(() => {
                    userEvent.click(button);
                });

                await departureAPI.getDepartures.mockResolvedValue({ departures: [{ id: 1 }] });
                expect(screen.queryByTestId('loader')).toBeNull();
            });

            it('should display data', async () => {
                render(<Search />);
                const button = screen.getByRole('button');
                await act(() => {
                    userEvent.click(button);
                });

                let data = [
                    {
                        id: 1,
                        arrival_time: '2022-07-01T10:45:00',
                        departure_time: ' 2022-07-01T10:45:00',
                    },
                    {
                        id: 2,
                        arrival_time: '2022-07-01T10:45:00',
                        departure_time: ' 2022-07-01T10:45:00',
                    },
                    {
                        id: 3,
                        arrival_time: '2022-07-01T10:45:00',
                        departure_time: ' 2022-07-01T10:45:00',
                    },
                ];

                await departureAPI.getDepartures.mockResolvedValue({
                    departures: data,
                });

                data.forEach((item) => {
                    expect(screen.getByText(item.id)).toBeInTheDocument();
                });
            });
        });

        describe('when request rejects', () => {
            beforeEach(() => {
                departureAPI.getDepartures.mockRejectedValue('Unable to retrieve data');
            });

            it('should show error message', async () => {
                render(<Search />);
                const button = screen.getByRole('button');
                await act(() => {
                    userEvent.click(button);
                });

                await departureAPI.getDepartures.mockResolvedValue({ departures: [{ id: 1 }] });
                const error = screen.getByTestId('error_message');
                expect(error).toBeInTheDocument();
            });
        });
    });
});
