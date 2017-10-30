import React, { Component } from 'react';
import { Container, Grid, Message } from 'semantic-ui-react';

class MissingEnvironmentVariable extends Component {
  render() {
    return (
      <Grid columns={1} padded stretched>
        <Grid.Column>
          <Container text>
            <Message negative>
              <Message.Header>
                Oups ! Il manque une variable d’environnement.
              </Message.Header>
              <p>
                Pour lancer l’application, n’oublie pas de configurer{' '}
                <strong>REACT_APP_BUSBUD_API_TOKEN</strong> dans un fichier{' '}
                <em>.env.local</em> (non versionné) 😉
              </p>
            </Message>
          </Container>
        </Grid.Column>
      </Grid>
    );
  }
}

export default MissingEnvironmentVariable;
