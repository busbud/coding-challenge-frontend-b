import React, { Component } from 'react'

import { connect } from 'react-redux'

import {
  requestResults,
  receiveResults
} from '../actions'

import ListItems from './ListItems'

import {fetchResults} from "../actions/index";

import loading from '../styles/img/busBud.png';

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
            <div>
              <img src={loading} className="App-loading" alt="loading" />
            </div>
              :
              <div>Service not available, please try later</div>
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