import * as React from 'react'
import { getResults } from '../../api'
import Header from '../Header'
import SearchForm from '../SearchForm'
import SearchResults from '../SearchResults'

interface SearchState {
  origin: string,
  destination: string,
  outboundDate: string
}

export default class SearchWrapper extends React.Component<any, any> {
  constructor (props: any) {
    super(props)

    this.getResults = this.getResults.bind(this)

    this.state = {
      origin: 'dr5reg',
      destination: 'f25dvk',
      outboundDate: '2019-08-02'
    }
  }

  async getResults () {
    const results = await getResults(this.state.origin, this.state.destination, this.state.outboundDate, {})
    console.log(results)
  }

  render () {
    return(
      <React.Fragment>
        <Header/>
        <SearchForm buttonClick={this.getResults} />
        <SearchResults />
      </React.Fragment>
    )
  }
}
