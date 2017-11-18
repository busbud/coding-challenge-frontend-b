import React, { Component } from 'react'

import { connect } from 'react-redux'

import {
  requestResults,
  receiveResults
} from '../actions'

import ListItems from './ListItems'

import {fetchResults} from "../actions/index";

class AsyncApp extends Component {

  componentDidMount() {
    const { dispatch, selectedResults } = this.props
    dispatch(fetchResults())
  }
  render(){

  	const{ selectedResults, results } = this.props

  	return <div>
      { results.items ?
          <div className={"container"}>
            <ListItems items={results.items}/>
          </div>
        :
        <div>
          {results.isFetching ?
              <div>LOADING</div>
              :
              <div>NO DATA</div>
          }
        </div>
      }
  	</div>
  }

}

function mapStateToProps(state) {
  const { results, selectedResults } = state
  const {
    isFetching,
    lastUpdated,
    items: destinations
  } = requestResults[selectedResults] || {
    isFetching: true,
    items: []
  }

  return {
    selectedResults,
    results,
    isFetching,
    lastUpdated
  }
}


export default connect(mapStateToProps)(AsyncApp)