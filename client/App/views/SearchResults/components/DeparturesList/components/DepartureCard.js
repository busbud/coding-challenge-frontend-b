import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { connect } from 'react-redux'
import { Card, Icon, Button, Grid, Image, Header, Label } from 'semantic-ui-react'
import './DepartureCard.scss'

class DepartureCard extends React.Component {
  render () {
    const departure = moment(this.props.departure.departure_time)
    const arrival = moment(this.props.departure.arrival_time)
    const FORMAT = 'HH:mm'

    return (
      <Card fluid>
        <Card.Content>
          <Grid relaxed>
            <Grid.Row className="pb5" columns={3} verticalAlign={'middle'}>
              <Grid.Column key={0} textAlign={'center'}>
                <Header as='h2'>
                  <Header.Subheader>Depart</Header.Subheader>
                  {departure.format(FORMAT)}
                </Header>
              </Grid.Column>
              <Grid.Column
                key={1}
                className="operator-logo-wrap"
                textAlign={'center'}
                verticalAlign={'middle'}
              >
                <Image src={this.props.operator.logo_url} />
              </Grid.Column>
              <Grid.Column key={2} textAlign={'center'}>
                <Header as='h2'>
                  <Header.Subheader>Arrive</Header.Subheader>
                  {arrival.format(FORMAT)}
                </Header>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row className="pt5" textAlign={'center'}>
              <Grid.Column>
                <Label basic circular>
                  <Icon name='time' /> {arrival.diff(departure, 'hours')} hours
                </Label>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Card.Content>
        <Card.Content extra>
          <Grid columns={2} verticalAlign={'middle'}>
            <Grid.Column key={0} textAlign={'left'}>
              <Label tag color={'green'} size={'large'}>
                {[
                  this.props.departure.prices.currency,
                  (this.props.departure.prices.total / 100).toFixed(2)
                ].join(' ')}
              </Label>
            </Grid.Column>
            <Grid.Column key={1} textAlign={'right'}>
              <Button primary>
                <Icon name='tag' /> Book Now
              </Button>
            </Grid.Column>
          </Grid>
        </Card.Content>
      </Card>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    operator: state.results.operators.find(opr => {
      return opr.id === ownProps.departure.operator_id
    }),
    originLocation: state.results.locations.find(loc => {
      return loc.id === ownProps.departure.origin_location_id
    }),
    destinationLocation: state.results.locations.find(loc => {
      return loc.id === ownProps.departure.destination_location_id
    })
  }
}

DepartureCard.propTypes = {
  departure: PropTypes.shape({
    id: PropTypes.string.isRequired,
    operator_id: PropTypes.string.isRequired,
    origin_location_id: PropTypes.number.isRequired,
    destination_location_id: PropTypes.number.isRequired,
    prices: PropTypes.shape({
      total: PropTypes.number.isRequired,
      currency: PropTypes.string.isRequired
    }),
    departure_time: PropTypes.string.isRequired,
    arrival_time: PropTypes.string.isRequired
  }),

  operator: PropTypes.shape({
    display_name: PropTypes.string.isRequired,
    logo_url: PropTypes.string.isRequired
  }),
  originLocation: PropTypes.shape({
    name: PropTypes.string.isRequired
  }),
  destinationLocation: PropTypes.shape({
    name: PropTypes.string.isRequired
  })
}

export default connect(mapStateToProps)(DepartureCard)
