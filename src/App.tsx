import React from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { Route, Switch } from 'react-router-dom';
import Home from './screens/Home';

const GlobalStyle = createGlobalStyle`
  html, body {
    height: 100%;
  }

  body {
    font-family: sans-serif;
    margin: 0;
    padding: 0;
  }
`;

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

const theme = {
  busbud: {
    color: colorPalette,
    card: {
      backgroundColor: colorPalette.white,
      shadow: '0 1px 3px 0 rgba(0,0,0,.24)'
    },
    button: {
      backgroundColor: colorPalette.orange,
      backgroundColorHover: colorPalette.darkOrange,
      borderRadius: '0.2857142857rem',
      color: colorPalette.white,
      boxShadow: 'none',
      padding: '10px',
      transition: 'all .2s',
      fontSize: '0.8rem'
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
      <GlobalStyle />
      <Switch>
        <Route exact path="/" component={Home} />
      </Switch>
    </ThemeProvider>
  );
}

export default App;
