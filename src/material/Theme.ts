import {createMuiTheme, responsiveFontSizes} from '@material-ui/core/styles';

const theme = () => {
    const primaryColor = '#50C4C9';
    const secondaryColor = '#FF5C60';

    return responsiveFontSizes(createMuiTheme({
        palette: {
            primary: {
                main: primaryColor
            },
            secondary: {
                main: secondaryColor
            }
        },
        overrides: {
            MuiCssBaseline: {
                '@global': {
                    html: {
                        minHeight: '100%',
                        height: '100%'
                    },
                    body: {
                        height: '100%',
                    }
                }
            }
        }
    }));
};

export default theme();


