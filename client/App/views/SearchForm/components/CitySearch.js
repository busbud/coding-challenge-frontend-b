import React from 'react'
import PropTypes from 'prop-types'
import { Search } from 'semantic-ui-react'
import cities from '@/App/services/cities'

class CitySearch extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isLoading: false,
      results: [],
      value: ''
    }
  }

  handleResultSelect (event, { result }) {
    if (this.props.onChange) {
      console.log('result', result)
      this.props.onChange(event, { value: result })
    }
  }

  handleSearchChange (event, { value }) {
    this.setState({ isLoading: true, value: value })
    cities
      .searchByName(value)
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
    const { isLoading, results } = this.state

    return (
      <Search
        fluid={true}
        loading={isLoading}
        onResultSelect={this.handleResultSelect.bind(this)}
        onSearchChange={this.handleSearchChange.bind(this)}
        results={this.mapCitiesWithSearchProps(results)}
        value={this.props.value.name}
        input={{ placeholder: this.props.placeholder || 'Search city...' }}
      />
    )
  }
}

CitySearch.propTypes = {
  value: PropTypes.shape({
    name: PropTypes.string.isRequired,
    geohash: PropTypes.string.isRequired
  }),
  onChange: PropTypes.func,
  placeholder: PropTypes.string
}

export default CitySearch
