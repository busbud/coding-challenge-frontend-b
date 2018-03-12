import React from 'react';
import Grid from 'material-ui/Grid';
import Collapse from 'material-ui/transitions/Collapse';
import Jumbotron from '../../components/Jumbotron';
import SearchForm from '../../containers/SearchForm';
import SearchResults from '../../containers/SearchResults';

export default () => (
  <Grid container justify="center">
    <Grid item md={8} xs={11}>
      <Collapse in={true}>
        <Jumbotron />
      </Collapse>
      <SearchForm />
      <SearchResults />
    </Grid>
  </Grid>
);
