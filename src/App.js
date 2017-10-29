import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import Header from './Header/Header';
import FoundTrips from './FoundTrips/FoundTrips';
import SearchForm from './SearchForm/SearchForm';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { hasSubmittedSearchForm: false };
  }

  submitSearchForm() {
    this.setState({ hasSubmittedSearchForm: true });
  }

  render() {
    let content;
    if (this.state.hasSubmittedSearchForm) {
      content = <FoundTrips />;
    } else {
      content = <SearchForm onSubmit={() => this.submitSearchForm()} />;
    }

    return (
      <Grid columns={1} padded stretched>
        <Header title="Départs pour Osheaga" />
        {content}
      </Grid>
    );
  }
}

export default App;
