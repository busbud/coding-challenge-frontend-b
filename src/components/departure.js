import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button } from 'reactstrap';

class Departure extends React.Component {
  render () {
    let departure_time = moment(this.props.departure_time).format('h:mmA');
    let arrival_time = moment(this.props.arrival_time).format('h:mmA');
    let duration = moment.duration(moment(this.props.arrival_time).diff(this.props.departure_time)).as('minutes');

    let arrivalIsNextDay = moment(this.props.arrival_time).get('date') - moment(this.props.departure_time).get('date') > 0;

    let { origin_location, destination_location } = this.props;

    return (
      <Card className="mb-3 departure-card">
        <CardBody>
          <p className="times">
            <span className="departure-time">{departure_time}</span>
            <span className="arrival-time">{arrival_time}{arrivalIsNextDay ? (<span className="next-day-indicator">+1</span>) : ''}</span>
          </p>
          <p className="locations">
            <span className="text-uppercase origin-location">{origin_location && origin_location.name}</span>
            <span className="text-uppercase destination-location">{destination_location && destination_location.name}</span>
          </p>
          {Math.floor(duration / 60)}h {Math.ceil(duration % 60)}m
          <p className="price-total">${this.props.prices.total/100} CAD</p>
        </CardBody>
      </Card>
    );
  }
}

Departure.propTypes = {
  departure_time: PropTypes.string,
  arrival_time: PropTypes.string,
  prices: PropTypes.shape({
    total : PropTypes.integer
  })
}

export default Departure;
