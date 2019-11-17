import React from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { Route, Switch } from 'react-router-dom';
import Home from './screens/Home';

const GlobalStyle = createGlobalStyle`
  html, body {
    height: 100%;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: sans-serif;
  }
`;

const theme = {
  busbud: {
    color: {
      lightBlue: '#e7f1fa',
      blue: '#127ccb',
      darkBlue: '#0a3b5f',
      lightGrey: '#f6f6f6',
      grey: '#dbdbdb',
      darkGrey: '#6b7072',
      orange: '#127ccb'
    },
    shadow: '0 1px 3px 0 rgba(0,0,0,.24)'
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
