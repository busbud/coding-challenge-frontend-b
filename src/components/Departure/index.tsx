import * as React from 'react'
import { getFormattedPrice, getFormattedDate } from './../../utils/helper'

interface DepartureProps {
  departure: any,
  operator: any,
  locations: any
}

export default class Departure extends React.Component<DepartureProps, any> {
  constructor (props: DepartureProps) {
    super(props)
  }

  render () {
    return(
      <div className='departure'>
        <div className='row'>
          <div className='col-md-9'>
            <div className='departure-logo'>
              <img src={this.props.operator.logo_url} alt={this.props.operator.display_name} />
            </div>
            <div className='departure-from'>
              <span className='departure-hour'>{getFormattedDate(this.props.departure.departure_time)}</span>
              <span className='departure-city'><b>{this.props.locations.fromCity.name}</b> - {this.props.locations.from.name}</span>
            </div>
            <div className='departure-to'>
              <span className='departure-hour departure-hour--to'>{getFormattedDate(this.props.departure.arrival_time)}</span>
              <span className='departure-city departure-city--to'><b>{this.props.locations.toCity.name}</b> - {this.props.locations.to.name}</span>
            </div>
          </div>
          <div className='col-md-3'>
            <div className='departure-price'>{getFormattedPrice(this.props.departure.prices.total)}<span>{this.props.departure.prices.currency}</span></div>
            <div className='departure-select'>
              <button>select</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
