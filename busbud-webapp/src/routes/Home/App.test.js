import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import Search from '../Search/Search';

describe('<App> component', () => {
    it('should render `Ready to Party` button link', () => {
        render(
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<App />} />
                </Routes>
            </BrowserRouter>
        );
        const button = screen.getByText('Ready to Party?');
        expect(button).toBeInTheDocument();
    });

    it('should render Osheaga logo', () => {
        render(
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<App />} />
                </Routes>
            </BrowserRouter>
        );
        const img = screen.getByAltText('Osheaga logo');
        expect(img.src).toMatch('Logo-Osheaga.png');
    });

    it('should navigate to Search page when button link is clicked', async () => {
        render(
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<App />} />
                    <Route path="/search" element={<Search />} />
                </Routes>
            </BrowserRouter>
        );

        await userEvent.click(screen.getByText(/ready to party/i));
        expect(screen.getByText(/Traveling from Quebec to Montreal/i)).toBeInTheDocument();
    });
});
