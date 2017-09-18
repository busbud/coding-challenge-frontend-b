import React from 'react'
import moment from 'moment'
import _ from 'underscore'
import { connect } from 'react-redux'
import { getTranslate, getActiveLanguage } from 'react-localize-redux';
import getSymbolFromCurrency from 'currency-symbol-map'

class DepartureItem extends React.Component {
  constructor(props){
    super(props)

    this.state = props
    this.price = this.price.bind(this)
    this.formatTime = this.formatTime.bind(this)
    this.additionnalDays = this.additionnalDays.bind(this)
  }

  componentWillReceiveProps(nextProps){
    if(! (_.isEqual(nextProps, this.state))){
      this.setState(nextProps)
    }
  }

  price(){
    return this.state.departure.prices.total / 100
  }

  formatTime(time){
    if(this.props.currentLanguage == 'fr'){
      return moment(time).format('HH:mm')
    } else {
      return moment(time).format('hh:mm A')
    }
  }

  additionnalDays(){
    let { departure_time, arrival_time } = this.state.departure
    departure_time = moment(departure_time)
    arrival_time = moment(arrival_time)

    const daysOffset = moment([
                         arrival_time.years(),
                         arrival_time.months(),
                         arrival_time.days()]
                       ).diff(moment([
                          departure_time.years(),
                          departure_time.months(),
                          departure_time.days()]), 'days')

    if(daysOffset > 0){
      return(<p className='pdl-15 pdt-10 f-12 medium'>{ ' +' + daysOffset + this.props.translate('days') }</p>)
    } else {
      return ''
    }
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
              <span className='f-12'>{this.props.translate('departure')} - </span>
              <span className='f-12 medium'>
                <a href={'http://www.google.com/maps/place/'+ departureLocation.lat + ', ' + departureLocation.lon + '/@' + departureLocation.lat + ', ' + departureLocation.lon + ',17z'} target='_blank'>plan</a>
              </span>
              <p className='pdl-15 pdt-10'>
                <span className='medium'>{this.formatTime(departure_time)} </span>
                <span>-</span>
                <span> {departureLocation.name}</span>
              </p>
            </div>
            <div className='departures-item__separator'>
              <div className='departures-item__arrow cover'></div>
            </div>
            <div className='departures-item__arrival pdl-25'>
              <span className='f-12'>{this.props.translate('arrival')} - </span>
              <span className='f-12 medium'>
                <a href={'http://www.google.com/maps/place/'+ arrivalLocation.lat + ', ' + arrivalLocation.lon + '/@' + arrivalLocation.lat + ', ' + arrivalLocation.lon + ',17z'} target='_blank'>plan</a>
              </span>
              { this.additionnalDays() }
              <p className='pdl-15 pdt-10'>
                <span className='medium'>{this.formatTime(arrival_time)} </span>
                <span>-</span>
                <span> {arrivalLocation.name}</span>
              </p>
            </div>
          </div>

          <div className='departures-item__price'>
            <div className='pdr-25'>
              <p className='medium f-24'>
                { this.price() + getSymbolFromCurrency(currency) }
                <span className='f-12'>{departure.prices.currency}</span></p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    translate: getTranslate(state.locale),
    currentLanguage: getActiveLanguage(state.locale).code
  }
}

export default connect(
  mapStateToProps
)(DepartureItem)
