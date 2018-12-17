import * as React from 'react'
import { getResults } from '../../api'
import Header from '../Header'
import SearchForm from '../SearchForm'
import SearchResults from '../SearchResults'

interface SearchState {
  origin: string,
  destination: string,
  outboundDate: string,
  params: any,
  cities: Array<any>,
  locations: Array<any>,
  operators: Array<any>,
  departures: Array<any>,
  searchHasStarted: boolean,
  complete: boolean
}

export default class SearchWrapper extends React.Component<any, SearchState> {
  constructor (props: any) {
    super(props)

    this.getResults = this.getResults.bind(this)

    this.state = {
      origin: 'dr5reg',
      destination: 'f25dvk',
      outboundDate: '2019-08-02',
      params: {
        adult: 1,
        child: 0,
        senior: 0,
        currency: 'CAD'
      },
      cities: [],
      locations: [],
      operators: [],
      departures: [],
      searchHasStarted: false,
      complete: false
    }
  }

  async getResults () {
    const results = await getResults(this.state.origin, this.state.destination, this.state.outboundDate, this.state.params)
    this.setState({
      cities: results.cities,
      locations: results.locations,
      operators: results.operators,
      departures: results.departures,
      searchHasStarted: true,
      complete: results.complete
    })
  }

  render () {
    return(
      <React.Fragment>
        <Header/>
        <SearchForm buttonClick={this.getResults} />
        {this.state.searchHasStarted ?
         <SearchResults
          cities={this.state.cities}
          departures={this.state.departures}
          operators={this.state.operators}
          locations={this.state.locations}
         />
        : null }
      </React.Fragment>
    )
  }
}
