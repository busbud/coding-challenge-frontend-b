import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Grid, Card, Button, Form, Input } from 'semantic-ui-react'
import CitySearch from './components/CitySearch'
import { updateSearchInputs } from '@/App/actions'
import './index.scss'

class SearchForm extends React.Component {
  handleOriginChange (event, { value }) {
    this.props.updateSearchInputs({
      ...this.state, originCity: value
    })
  }

  handleDestinationChange (event, { value }) {
    this.props.updateSearchInputs({
      ...this.state, destinationCity: value
    })
  }

  handleAdultsChange (event, { value }) {
    this.props.updateSearchInputs({
      ...this.state,
      adults: (value && parseInt(value)) || 0
    })
  }

  render () {
    const formattedDate = this.props.inputs.date.toLocaleDateString('en-US', {
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
                    <CitySearch
                      value={this.props.inputs.originCity}
                      onChange={this.handleOriginChange.bind(this)}
                      placeholder={'Search origin city'}
                    />
                  </Form.Field>
                  <Form.Field required>
                    <label>Destination City</label>
                    <CitySearch
                      value={this.props.inputs.destinationCity}
                      onChange={this.handleDestinationChange.bind(this)}
                      placeholder={'Search destination city'}
                    />
                  </Form.Field>
                  <Form.Group widths='equal'>
                    <Form.Field required>
                      <label>Adults</label>
                      <Input
                        value={this.props.inputs.adults}
                        onChange={this.handleAdultsChange.bind(this)}
                        icon='users'
                        placeholder='Number of adult travelers'
                      />
                    </Form.Field>
                    <Form.Field required>
                      <label>Date of Travel</label>
                      <Input
                        value={formattedDate}
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

const cityShape = PropTypes.shape({
  name: PropTypes.string.isRequired,
  geohash: PropTypes.string.isRequired
})

SearchForm.propTypes = {
  inputs: PropTypes.shape({
    originCity: cityShape,
    destinationCity: cityShape,
    date: PropTypes.instanceOf(Date).isRequired,
    adults: PropTypes.number
  }),
  updateSearchInputs: PropTypes.func
}

const mapStateToProps = state => {
  return {
    inputs: state.inputs
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateSearchInputs () {
      dispatch(updateSearchInputs(...arguments))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchForm)
