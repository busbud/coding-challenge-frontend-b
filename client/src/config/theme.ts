import { createMuiTheme } from '@material-ui/core/styles';

export const themes: any = {
    default: {
        palette: {
            primary: { main: '#d7ebfc' },
            secondary: { main: '#1b87b2' },
        },
        themeName: 'dark',
    },
};

export const theme = createMuiTheme({
    palette: themes.default.palette,
});
