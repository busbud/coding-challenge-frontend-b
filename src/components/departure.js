import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Card, CardBody, Col, Row } from 'reactstrap';
import { translate } from 'react-i18next';

class Departure extends React.Component {
  render () {
    let { t } = this.props;
    let departure_time = moment(this.props.departure_time).format('h:mm A');
    let arrival_time = moment(this.props.arrival_time).format('h:mm A');
    let duration = moment.duration(moment(this.props.arrival_time).diff(this.props.departure_time)).as('minutes');

    let arrivalIsNextDay = moment(this.props.arrival_time).get('date') - moment(this.props.departure_time).get('date') > 0;

    let { origin_location, destination_location } = this.props;

    return (
      <Card className="mb-3 departure-card">
        <CardBody>
          <Row>
            <Col xs={{size:12}} md={{size:6}}>
              <p className="departure">
                <span className="departure-time">{departure_time}</span>
                <span className="origin-location">{origin_location && origin_location.name}</span>
              </p>
              <p className="arrival">
                <span className="arrival-time">{arrival_time}{arrivalIsNextDay ? (<span className="next-day-indicator">+1</span>) : ''}</span>
                <span className="destination-location">{destination_location && destination_location.name}</span>
              </p>
              <p className="duration">
                <i className="material-icons">timer</i> {Math.floor(duration / 60)}h {Math.ceil(duration % 60)}m
              </p>
            </Col>
            <Col xs={{size:12}} md={{size:6}}>
              <p className="price-total mb-0">
                <span className="cost">${this.props.prices.total/100} CAD</span>
                <span className="price-notice">{t('oneWayPerPerson')}</span>
              </p>
            </Col>
          </Row>
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

export default translate('translations')(Departure);
