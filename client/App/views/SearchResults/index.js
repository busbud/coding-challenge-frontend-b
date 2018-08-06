import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Grid } from 'semantic-ui-react'
import SearchDetails from './components/SearchDetails'
import DeparturesList from './components/DeparturesList'
import { updateSearchResults } from '@/App/actions'
import './index.scss'

class SearchResults extends React.Component {
  constructor (props) {
    super(props)
    props.updateSearchResults()
  }

  render () {
    console.log('departures', this.props.departures)

    return (
      <Grid
        verticalAlign={'middle'}
        textAlign={'center'}
      >
        <Grid.Row>
          <Grid.Column mobile={15} tablet={9} largeScreen={6}>
            <div className="search-details">
              <SearchDetails
                origin={this.props.inputs.originCity.name}
                destination={this.props.inputs.destinationCity.name}
                date={this.props.inputs.date}
                adults={this.props.inputs.adults}
              />
            </div>
            <DeparturesList departures={this.props.departures}/>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}

const mapStateToProps = state => {
  return {
    inputs: state.inputs,
    departures: state.results.departures
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateSearchResults () {
      dispatch(updateSearchResults(...arguments))
    }
  }
}

const cityShape = PropTypes.shape({
  name: PropTypes.string.isRequired,
  geohash: PropTypes.string.isRequired
})

SearchResults.propTypes = {
  inputs: PropTypes.shape({
    originCity: cityShape,
    destinationCity: cityShape,
    date: PropTypes.instanceOf(Date).isRequired,
    adults: PropTypes.number
  }),
  departures: PropTypes.array,
  updateSearchResults: PropTypes.func
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchResults)
