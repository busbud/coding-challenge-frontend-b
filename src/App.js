import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import Header from './Header/Header';
import SearchForm from './SearchForm/SearchForm';

class App extends Component {
  render() {
    return (
      <Grid columns={1} padded stretched>
        <Header title="Départs pour Osheaga" />
        <SearchForm />
      </Grid>
    );
  }
}

export default App;
