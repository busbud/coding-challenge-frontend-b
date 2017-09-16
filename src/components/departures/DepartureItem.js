import React from 'react'
import moment from 'moment'
import _ from 'underscore'
import getSymbolFromCurrency from 'currency-symbol-map'

class DepartureItem extends React.Component {
  constructor(props){
    super(props)

    this.state = props
    this.price = this.price.bind(this)
  }

  componentWillReceiveProps(nextProps){
    if(! (_.isEqual(nextProps.departureLocation, this.state.departureLocation))){
      this.setState({ departureLocation: nextProps.departureLocation })
    }

    if(! (_.isEqual(nextProps.arrivalLocation, this.state.arrivalLocation))){
      this.setState({ arrivalLocation: nextProps.arrivalLocation })
    }
  }

  price(){
    return this.state.departure.prices.total / 100
  }

  render(){
    const { departure, arrivalLocation, departureLocation } = this.state
    const { departure_time, arrival_time } = departure
    const currency = departure.prices.currency

    return(
      <div className='departure-item'>
        <div className='departures-item__infos'>
          <div>
            <div className='departures-item__departure pdl-25'>
              <span className='f-10'>Départ</span>
              <p className='pdl-15'>
                <span className='medium'>{moment(departure_time).format('HH:mm')} </span>
                <span>-</span>
                <span> {departureLocation.name}</span>
              </p>
            </div>
            <div className='departures-item__separator'>
              <div className='departures-item__arrow cover'></div>
            </div>
            <div className='departures-item__arrival pdl-25'>
              <span className='f-10'>Arrivée</span>
              <p className='pdl-15'>
                <span className='medium'>{moment(arrival_time).format('HH:mm')} </span>
                <span>-</span>
                <span> {arrivalLocation.name}</span>
              </p>
            </div>
          </div>

          <div className='departures-item__price'>
            <div className='pdr-25'>
              <p className='medium f-24'>
                { this.price() + getSymbolFromCurrency(currency) }
                <span className='f-10'>{departure.prices.currency}</span></p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DepartureItem
