import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as departuresActions from '../actions/departuresActions'
import * as Search from '../api/search'

import DeparturesList from './departures/DeparturesList'

class App extends React.Component {
  constructor(props){
    super(props)

    this.state = props
  }

  componentWillMount(){
    const self = this

    Search.default.initialize().then(function(result){
      self.props.departuresActions.populateDepartures(result)
      self.setState({ departures: result })
    })
  }

  render(){
    const { departures } = this.state.departures

    return(
      <div>
        <h1>Hello busbud</h1>
        <DeparturesList departures={departures}/>
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
