import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid } from 'semantic-ui-react';
import { fetchTrips } from './actions/index';
import Header from './Header/Header';
import SearchForm from './SearchForm/SearchForm';
import FoundTrips from './FoundTrips/FoundTrips';

const mapStateToProps = state => {
  return {
    shouldDisplayOnboarding: state.shouldDisplayOnboarding
  };
};

const mapDispatchToProps = dispatch => {
  return {
    submitSearchForm: () => dispatch(fetchTrips())
  };
};

export class App extends Component {
  render() {
    let content;
    if (this.props.shouldDisplayOnboarding) {
      content = <SearchForm onSubmit={() => this.props.submitSearchForm()} />;
    } else {
      content = <FoundTrips />;
    }

    return (
      <Grid columns={1} padded stretched>
        <Header title="Départs pour Osheaga" />
        {content}
      </Grid>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
