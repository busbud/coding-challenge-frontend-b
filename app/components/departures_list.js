import React, { Component } from 'react'
import { connect }          from 'react-redux'
import PropTypes            from 'prop-types'
import { DeparturesItem }   from './departures_item'
import { updateDepartures }    from '../store/actions.js'

export class Departures extends Component {

  hasDeparturesBeenUpdated(nextProps) {
    return (
      nextProps.departures.length != this.props.departures.length ||
      nextProps.cities.length != this.props.cities.length
    )
  }

  componentWillReceiveProps(nextProps) {
    // Departures has been updated and not yet fully fetched
    if (!nextProps.complete && this.hasDeparturesBeenUpdated(nextProps)) {
      this.props.pollDepartures(nextProps)
    }
  }

  // Returns the location name of a location id || 'unknown'
  getLocationName(locationId) {
    let name = 'unknown'

    this.props.locations.some( location => {
      if (locationId === location.id) {
        name = location.name
        return true
      }
    })

    return name
  }

  // Return the city name from an cityId
  getCityName(cityId) {
    let name = 'unknown'

    this.props.cities.some( city => {
      if (cityId === city.id) {
        name = city.name
        return true
      }
    })

    return name
  }

  render() {
    let loader = null;
    if (!this.props.complete) {
      loader = <div >Loading...</div>;
    }

    const nb = this.props.departures.length
    const origin = this.getCityName(this.props.origin_city_id)
    const destination = this.getCityName(this.props.destination_city_id)

    return (
      <div >
        <h1>{this.context.t('{nb} departures from {origin} to {destination} found:', { nb, origin, destination })}</h1>
        <ul id="departures">
          {this.props.departures.map( departure =>
            <li key={departure.id}>
              <DeparturesItem 
                departureName={this.getLocationName(departure.origin_location_id)}
                departureTime={departure.departure_time}
                arrivalName={this.getLocationName(departure.destination_location_id)}
                arrivalTime={departure.arrival_time}
                price={departure.prices.total}
              />
            </li>
          )}
        </ul>
        {loader}
      </div>
    )
  }
}

Departures.contextTypes = {
  t: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  lang                : state.i18nState.lang,
  translations        : state.i18nState.translations,
  origin_city_id      : state.apiData.origin_city_id,
  destination_city_id : state.apiData.destination_city_id,
  cities              : state.apiData.cities,
  complete            : state.apiData.complete,
  currentSearch       : state.currentSearch,
  departures          : state.apiData.departures,
  locations           : state.apiData.locations,
})

const mapDispatchToProps = (dispatch) => ({
  pollDepartures : (nextProps) => {
    const { origin, destination, outbound_date: outboundDate } = nextProps.currentSearch
    const index = nextProps.departures.length

    // polling in 5s
    setTimeout( _ => {
      dispatch(updateDepartures(origin, destination, outboundDate, index))
    }, 5000)
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(Departures)