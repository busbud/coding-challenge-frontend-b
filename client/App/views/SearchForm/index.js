import React from 'react'
import moment from 'moment'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Container, Grid, Card, Button, Form, Input } from 'semantic-ui-react'
import CitySearch from './components/CitySearch'
import { updateSearchInputs } from '@/App/actions'
import './index.scss'

class SearchForm extends React.Component {
  handleOriginChange (event, { value }) {
    this.props.updateSearchInputs({
      ...this.props.inputs, originCity: value
    })
  }

  handleDestinationChange (event, { value }) {
    this.props.updateSearchInputs({
      ...this.props.inputs, destinationCity: value
    })
  }

  handleAdultsChange (event, { value }) {
    this.props.updateSearchInputs({
      ...this.props.inputs,
      adults: (value && parseInt(value)) || 0
    })
  }

  render () {
    return (
      <Container className="search-form-wrap">
        <Grid
          verticalAlign={'middle'}
          centered={true}
        >
          <Grid.Row>
            <Grid.Column
              mobile={15}
              tablet={9}
              computer={8}
              largeScreen={7}
            >
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
                    <Grid columns={2}>
                      <Grid.Column key={0}>
                        <Form.Field required>
                          <label>Adults</label>
                          <Input
                            value={this.props.inputs.adults}
                            onChange={this.handleAdultsChange.bind(this)}
                            icon='users'
                            placeholder='Number of adult travelers'
                          />
                        </Form.Field>
                      </Grid.Column>
                      <Grid.Column key={1}>
                        <Form.Field required>
                          <label>Date of Travel</label>
                          <Input
                            value={moment(this.props.inputs.date).format('ll')}
                            icon='calendar'
                            placeholder='Date of Travel'
                            disabled
                          />
                        </Form.Field>
                      </Grid.Column>
                    </Grid>
                  </Form>
                </Card.Content>
                <Card.Content textAlign={'center'} extra>
                  <Link to="/search-results">
                    <Button primary>Search Buses</Button>
                  </Link>
                </Card.Content>
              </Card>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
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
