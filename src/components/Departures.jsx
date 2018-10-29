import React from 'react';
import Loading from './Loading';
import moment from 'moment';
import numeral from 'numeral';
import { FormattedMessage } from 'react-intl';
import './Departures.css';

export default class Departures extends React.Component {
  render() {
    const { schedules } = this.props
    return (
      <div className='departures'>
        <div className='result-number'>
          <FormattedMessage
            id='departures.result'
            defaultMessage='{number, plural,
            =0 {No results}
            one {# Result}
            other {# Results}}'
            description='Departures result number'
            values={{
              number: schedules.departures.length
            }}
          />
        </div>

        { schedules.isLoading && <Loading /> }

        {
          schedules.departures.map(
            departure => <Departure key={departure.id} departure={departure} schedules={schedules} />
          )
        }
      </div>
    )
  }
}

const dateFormat = 'hh:mm a';

const Departure = ({departure, schedules}) => (
  <div className='departure'>
    <div className='departure-summary'>

      <div className='departure-summary-origin'>
        <span className='time'>{moment(departure.departure_time).format(dateFormat)}</span>
        <span className='city'>
          <strong>{schedules.cities[0].name}</strong>
          {schedules.locations[departure.origin_location_id].name}
        </span>
      </div>

      <div className='departure-summary-destination'>
        <span className='time'>{moment(departure.arrival_time).format(dateFormat)}</span>
        <span className='city'>
          <strong>{schedules.cities[1].name}</strong>
          {schedules.locations[departure.destination_location_id].name}
        </span>
      </div>

    </div>

    <div className='departure-prices'>
      {numeral(departure.prices.total / 100).format('$0,0')} <small>{departure.prices.currency}</small>
    </div>
  </div>
)
