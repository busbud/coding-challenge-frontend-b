import React, { Component } from 'react'
import { ResultList } from '../../components'
import { connect } from 'react-redux'
import { search } from '../../actions'

class ResultListContainer extends Component {

  async componentDidMount() {
    await this.props.search(this.props.params)
  }

  render () {
    const { isFetching, error, departures, lastUpdated } = this.props
    return (
      <ResultList
        isFetching={isFetching}
        lastUpdated={lastUpdated}
        departures={departures}
        error={error} />
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  search: (arg) => dispatch(search(arg))
})

const mapStateToProps = (state) => ({
  isFetching: state.search.isFetching,
  departures: state.results.departures,
  lastUpdated: state.results.lastUpdated,
  error: state.error
})

export default connect(mapStateToProps, mapDispatchToProps)(ResultListContainer)