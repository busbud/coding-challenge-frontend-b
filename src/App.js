import React, { Component } from 'react';
import Results from './components/results/results'
import Navbar from './components/navbar/navbar'
import SearchForm from './components/searchForm'
import {
  Grid
} from 'react-bootstrap'
import {connect} from 'react-redux'
import {initializeLocale} from './actions'
import './App.css';

class App extends Component {

  componentWillMount = () => {
    this.props.initializeLocale()
  }

  render() {
    return (
      <section>
        <Navbar></Navbar>
        <Grid>
          <SearchForm></SearchForm>
          <Results></Results>
        </Grid>
      </section>
      
    )
  }
}

export default connect(
  (state) => ({
     
  }),
  {
    initializeLocale
  }
)(App)
