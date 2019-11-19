import React from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { Route, Switch } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Home from './screens/Home';
import Departures from './screens/Departures';
import NotFound from './screens/NotFound';

const colorPalette = {
  white: '#ffffff',
  black: '#000000',
  lightBlue: '#e7f1fa',
  blue: '#127ccb',
  darkBlue: '#0a3b5f',
  lightGrey: '#f6f6f6',
  grey: '#dbdbdb',
  darkGrey: '#6b7072',
  orange: '#f19020',
  darkOrange: '#d1760d'
};

const GlobalStyle = createGlobalStyle`
  html, body {
    height: 100%;
  }

  body {
    background-color: ${colorPalette.lightGrey};
    font-family: sans-serif;
    margin: 0;
    padding: 0;
  }
`;

const theme = {
  busbud: {
    color: colorPalette,
    card: {
      backgroundColor: colorPalette.white,
      boxShadow: '0 1px 3px 0 rgba(0,0,0,.24)',
      margin: '30px',
      padding: '20px'
    },
    button: {
      backgroundColor: colorPalette.orange,
      backgroundColorHover: colorPalette.darkOrange,
      borderRadius: '0.2857142857rem',
      color: colorPalette.white,
      boxShadow: 'none',
      padding: '10px',
      transition: 'all .2s',
      fontSize: '0.8rem',
      fontWeight: 'bold'
    },
    header: {
      backgroundColor: colorPalette.blue,
      color: colorPalette.white,
      padding: '20px'
    },
    section: {
      backgroundColor: colorPalette.grey
    }
  }
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyle />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route
          path="/departures/:origin/:destination/:date"
          component={Departures}
        />
        <Route component={NotFound} />
      </Switch>
    </ThemeProvider>
  );
}

export default App;
