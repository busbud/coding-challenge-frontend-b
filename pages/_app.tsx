import { RecoilRoot } from "recoil";
import DateAdapter from '@mui/lab/AdapterDayjs';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../styling/theme';

export default function App({ Component, pageProps }) {
    return (
        <ThemeProvider theme={theme}>
            <RecoilRoot>
                <LocalizationProvider dateAdapter={DateAdapter}>
                    <Component {...pageProps} />
                </LocalizationProvider>
            </RecoilRoot>
        </ThemeProvider>
    );
}
