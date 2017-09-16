import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as departuresActions from '../actions/departuresActions'
import * as Search from '../api/search'

import Loader from './Loader'
import DeparturesList from './departures/DeparturesList'
import DeparturesHeader from './departures/DeparturesHeader'

class App extends React.Component {
  constructor(props){
    super(props)

    this.state = props

    this.renderLoader = this.renderLoader.bind(this)
    this.renderDeparturesHeader = this.renderDeparturesHeader.bind(this)
  }

  componentWillMount(){
    const self = this
    let departures = {}

    const pollDepartures = setInterval(function(){
      Search.default.getDepartures('poll').then(function(pollResult){
        if(pollResult.complete){
          const newDepartures = Object.assign({}, self.state.departures,
            { departures: pollResult.departures },
            { locations: pollResult.locations },
            { operators: pollResult.operators },
            { complete: pollResult.complete }
          )

          self.setState({ departures: newDepartures })
          clearInterval(pollDepartures)
        }
      })
    }, 2000)

    Search.default.getDepartures('').then(function(result){
      self.props.departuresActions.populateDepartures(result)
      !result.complete ? pollDepartures : self.setState({ departures: result })
    })
  }

  renderLoader() {
    const { complete } = this.state.departures

    if(!complete){
      return(<Loader />)
    } else {
      return null
    }
  }

  renderDeparturesHeader() {
    const { cities } = this.state.departures

    console.log(typeof(cities) != 'undefined')

    if(typeof(cities) != 'undefined'){
      return(<DeparturesHeader cities={cities} />)
    } else {
      return null
    }
  }

  render(){
    const { departures, cities } = this.state.departures

    return(
      <div>
        { this.renderDeparturesHeader() }
        { this.renderLoader() }
        <DeparturesList departures={departures} />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    departures: state.departures
  }
}

function mapDispatchToProps(dispatch) {
  return {
    departuresActions: bindActionCreators(departuresActions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
