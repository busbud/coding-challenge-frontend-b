import React from 'react'
import { Search } from 'semantic-ui-react'
import cities from './services/cities'

export default class CitySearch extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isLoading: false,
      results: [],
      value: ''
    }
  }

  handleResultSelect (event, { result }) {
    this.setState({ value: result.name })
  }

  handleSearchChange (event, { value }) {
    this.setState({ isLoading: true, value: value })
    cities
      .search(value)
      .then((results) => {
        this.setState({ isLoading: false, results: results })
      }, (error) => {
        this.setState({ isLoading: false, results: [] })
        // show popup on error
        console.error('error in fetching cities', error)
      })
  }

  mapCitiesWithSearchProps (results) {
    return results.map(result => {
      return { key: result.id, title: result.full_name }
    })
  }

  render () {
    const { isLoading, value, results } = this.state

    return (
      <Search
        fluid={true}
        minCharacters={3}
        loading={isLoading}
        onResultSelect={this.handleResultSelect.bind(this)}
        onSearchChange={this.handleSearchChange.bind(this)}
        results={this.mapCitiesWithSearchProps(results)}
        value={value}
        input={{ placeholder: 'Search city...' }}
      />
    )
  }
}
