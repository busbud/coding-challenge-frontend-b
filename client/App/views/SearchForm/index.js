import React from 'react'
import {
  Grid,
  Card,
  Button,
  Form,
  Input
} from 'semantic-ui-react'
import CitySearch from './components/CitySearch'
import './index.scss'

export default class SearchForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      originCity: null,
      destinationCity: null,
      numberOfAdults: 1,
      dateOfTravel: new Date(2018, 8, 1)
    }
  }

  render () {
    const { dateOfTravel, numberOfAdults } = this.state
    const formattedDateOfTravel = dateOfTravel.toLocaleDateString('en-US', {
      weekday: 'short',
      year: '2-digit',
      month: 'short',
      day: 'numeric'
    })

    return (
      <Grid
        verticalAlign={'middle'}
        textAlign={'center'}
      >
        <Grid.Row>
          <Grid.Column mobile={15} tablet={9} largeScreen={6}>
            <Card fluid>
              <Card.Content>
                <Form>
                  <Form.Field required>
                    <label>Origin City</label>
                    <CitySearch placeholder={'Search origin city'} />
                  </Form.Field>
                  <Form.Field required>
                    <label>Destination City</label>
                    <CitySearch placeholder={'Search destination city'} />
                  </Form.Field>
                  <Form.Group widths='equal'>
                    <Form.Field required>
                      <label>Adults</label>
                      <Input
                        value={numberOfAdults}
                        icon='users'
                        placeholder='Number of adult travelers'
                      />
                    </Form.Field>
                    <Form.Field required>
                      <label>Date of Travel</label>
                      <Input
                        value={formattedDateOfTravel}
                        icon='calendar'
                        placeholder='Date of Travel'
                        disabled
                      />
                    </Form.Field>
                  </Form.Group>
                </Form>
              </Card.Content>
              <Card.Content extra>
                <div>
                  <Button primary>Search Buses</Button>
                </div>
              </Card.Content>
            </Card>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}
