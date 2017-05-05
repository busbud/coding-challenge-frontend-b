import React, { Component } from 'react'
import { Search } from '../../components'
import { Redirect } from 'react-router-dom'

class SearchContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      redirectToResults: false,
      query: {}
    }

    this._handleSearch = this._handleSearch.bind(this)
  }

  _handleSearch (e) {
    e.preventDefault()
    this.setState({ redirectToResults: true })
  }

  render () {

    if (this.state.redirectToResults) {
      return (
        <Redirect to={`/bus-schedule-results/new-york/montreal`} />
      )
    }

    return (
      <Search handleSubmit={ this._handleSearch } />
    )
  }
}

export default SearchContainer
