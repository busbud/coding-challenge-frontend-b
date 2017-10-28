import React, { Component } from 'react';
import { Container, Form, Grid, Icon, Message } from 'semantic-ui-react';
import ReadOnlyInput from './ReadOnlyInput/ReadOnlyInput';
import SubmitButton from './SubmitButton/SubmitButton';

class SearchForm extends Component {
  render() {
    return (
      <Grid.Column>
        <Container text>
          <Message>
            <Icon name="thumbs outline up" /> Trouvez le meilleur trajet pour{' '}
            <strong>le festival Osheaga de Montréal</strong> avec Busbud !
          </Message>
          <Form>
            <ReadOnlyInput label="Départ de" value="New York City" />
            <ReadOnlyInput label="Date de départ" value="2 août 2018" />
            <ReadOnlyInput label="Passagers" value="1 adulte" />
            <SubmitButton label="Rechercher" />
          </Form>
        </Container>
      </Grid.Column>
    );
  }
}

export default SearchForm;
