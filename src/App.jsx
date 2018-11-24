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
        useNextVariants: true
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
                <CssBaseline />
                <BrowserRouter onUpdate={() => window.scrollTo(0, 0)}>
                    <Switch>
                        <Route path='/' exact render={() => this.createLayout(<SearchContainer />)} />
                        
                        <Route render={() => this.createLayout(<NotFound />)} />
                    </Switch>
                </BrowserRouter>
            </MuiThemeProvider>
        );
    }
}

export default App;
