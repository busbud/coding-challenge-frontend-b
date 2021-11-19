import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// Create a theme instance.
const theme = createTheme({
    breakpoints: {
        values: {
            xs: 0,
            sm: 300,
            md: 600,
            lg: 992,
            xl: 1080,
        },
    },
    spacing: 4,
    palette: {
        primary: {
            main: '#20415A',
        },
        secondary: {
            main: '#698CA5',
        },
        info: {
            main: '#436783',
        },
        error: {
            main: red.A400,
        },
        background: {
            default: '#effef6',
        },
        text: {
            primary: '#20415A',
            secondary: '#698CA5',
        },
        action: {
            active: '#0271CA',
            hover: '#30B0FF',
        }
    },
});

export default theme;

// secondary: 698CA5
// action: ff6c19
// background: effef6
// search: 0295fe
// #20415A

/**
 * search button:
 *  default: 0271CA
 *  hover: 0871F2
 */