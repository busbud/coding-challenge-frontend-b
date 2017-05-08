import React, { Component } from 'react'
import { Search } from '../../components'
import { Redirect } from 'react-router-dom'
import moment from 'moment'

class SearchContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      redirectToResults: false,
      leaving: moment("2017-07-29"), // hard code this
      departute: 'dr5reg', // hard code this
      arrival: 'f25dvk', // hard code this
    }

    this._handleSearch = this._handleSearch.bind(this)
  }

  _handleSearch (e) {
    e.preventDefault()
    this.setState({ redirectToResults: true })
  }

  render () {
    const {leaving, departute, arrival} = this.state

    return (
      <div>
        <Search handleSubmit={ this._handleSearch } leaving={this.state.leaving} />
        { this.state.redirectToResults &&
          <Redirect to={`/bus-schedule-results/${departute}/${arrival}/${leaving._i}`} /> }
      </div>
    )
  }
}

export default SearchContainer
