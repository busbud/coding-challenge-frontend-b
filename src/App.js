import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import './App.css';

class App extends Component {
  render() {
    return (
      <Grid padded>
        <Grid.Column color="orange">
          <h1 className="App-title">Départs pour Osheaga</h1>
        </Grid.Column>
      </Grid>
    );
  }
}

export default App;
