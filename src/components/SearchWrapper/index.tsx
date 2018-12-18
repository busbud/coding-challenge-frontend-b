import * as React from 'react'
import { getResults, getPollResults } from '../../api'
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
    }, () => {
      this.startPollInterval()
    })
  }

  async getPollResults () {
    const index: number = this.state.departures.length
    const params: Array<any> = this.state.params

    params['index'] = index

    const results = await getPollResults(this.state.origin, this.state.destination, this.state.outboundDate, this.state.params)

    this.setState({
      locations: this.state.locations.concat(results.locations),
      operators: this.state.operators.concat(results.operators),
      departures: this.state.departures.concat(results.departures),
      complete: results.complete
    })
  }

  startPollInterval () {
    const intervalLength: number = 3000

    const interval = setInterval(() => {
      if (!this.state.complete) {
        this.getPollResults()
      } else {
        clearInterval(interval)
      }
    }, intervalLength)
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
