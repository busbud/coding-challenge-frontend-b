import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import PrimaryButton from './PrimaryButton';

describe('PrimaryButton', () => {
    it('should render children', () => {
        render(<PrimaryButton>Hello!</PrimaryButton>);
        expect(screen.getByText('Hello!')).toBeInTheDocument();
    });

    it('should call onClick callback when clicked if callback is passed', async () => {
        let onClick = jest.fn();
        render(<PrimaryButton onClick={onClick}>Hello!</PrimaryButton>);
        const button = screen.getByRole('button');
        await act(() => {
            userEvent.click(button);
        });
        expect(onClick).toHaveBeenCalled();
    });
});
