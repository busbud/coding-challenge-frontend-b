import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import CssBaseline from '@material-ui/core/CssBaseline';
import Layout from './Layout';
import NotFound from './NotFound';
import SearchContainer from './search/SearchContainer';
import './App.scss';

const theme = createMuiTheme({
    typography: {
        useNextVariants: true,
        fontFamily: 'Poppins,sans-serif',
        h4: {
            fontFamily: 'Changa One, impact, sans-serif',
            color: '#0f3852',
        }
    },
    palette: {
        primary: {
            main: '#2880bc',
        },
        secondary: {
            main: '#80cbb2',
        },
        background: {
            default: '#2880bc',
        }
    },
    overrides: {
        MuiButton: {
            root: {
                fontFamily: 'Changa One, impact, sans-serif',
                padding: '0 30px',
            },
        }
    }
});

class App extends Component {
    createLayout = (target) => {
        return (
            <Layout>
                {target}
            </Layout>
        );
    }

    render() {
        return (
            <MuiThemeProvider theme={theme}>
                <CssBaseline>
                <BrowserRouter onUpdate={() => window.scrollTo(0, 0)}>
                    <Switch>
                        <Route path='/' exact render={() => this.createLayout(<SearchContainer />)} />
                        
                        <Route render={() => this.createLayout(<NotFound />)} />
                    </Switch>
                </BrowserRouter>
                </CssBaseline>
            </MuiThemeProvider>
        );
    }
}

export default App;
