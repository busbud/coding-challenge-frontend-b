import React, { Component } from 'react';
import Results from './components/results/results'
import SearchForm from './components/searchForm'
import {
  Grid
} from 'react-bootstrap'
import './App.css';

class App extends Component {
  render() {
    return (
      <Grid>
        <SearchForm></SearchForm>
        <Results></Results>
      </Grid>
    )
  }
}

export default App;
