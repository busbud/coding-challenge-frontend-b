import * as React from 'react'
import Departure from './../Departure'
import { getLocations, getOperator } from '../../utils/helper'

interface SearchResultsProps {
  cities: Array<any>,
  departures: Array<any>,
  operators: Array<any>,
  locations: Array<any>
}

export default class SearchResults extends React.Component<SearchResultsProps, any> {
  constructor (props: SearchResultsProps) {
    super(props)
  }

  render () {
    return(
      <div className='container'>
        <div className='row'>
          <div className='offset-md-2 col-md-8'>
            <div className='results-top'>
              <div className='col-md-4'>
                {this.props.departures.length} results
              </div>
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='offset-md-2 col-md-8'>
            { this.props.departures.map((departure: any, i: number) => {
              return(
                <Departure
                  key={i}
                  departure={departure}
                  operator={getOperator(departure.operator_id, this.props.operators)}
                  locations={getLocations(departure.origin_location_id, departure.destination_location_id, this.props.locations, this.props.cities)}
                />
              )
            })}
          </div>
        </div>
      </div>
    )
  }
}
