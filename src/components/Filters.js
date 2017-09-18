import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import _ from 'underscore'
import * as departuresActions from '../actions/departuresActions'
import { getTranslate, getActiveLanguage } from 'react-localize-redux';

class Filters extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      active: false
    }

    this.onClick = this.onClick.bind(this)
    this.orderById = this.orderById.bind(this)
    this.orderByDepartureTime = this.orderByDepartureTime.bind(this)
  }

  orderById(){
    const orderedDepartures = _.sortBy(this.props.departures, function(departure){
                                return departure.id
                              })

    this.props.departuresActions.reorderDepartures(orderedDepartures)
  }

  orderByDepartureTime(){
    const orderedDepartures = _.sortBy(this.props.departures, function(departure){
                                return departure.departure_time
                              })
    this.props.departuresActions.reorderDepartures(orderedDepartures)
  }

  onClick(){
    const { active } = this.state

    if(active){
      this.orderById()
    } else {
      this.orderByDepartureTime()
    }

    this.setState({ active: !active })
  }

  render(){
    const { active } = this.state
    const class_name = active ? 'active' : ''

    return(
      <div className='filters'>
        <div className='flux pdt-30'>
          <p className='medium pdl-15 inline'>Filtrer par:</p>
          <ul className='inline'>
            <li className={class_name + ' inline filter-item'} onClick={this.onClick}>{this.props.translate('filter_departure_time')}</li>
          </ul>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state){
  return {
    departures: state.departures.departures,
    translate: getTranslate(state.locale),
    currentLanguage: getActiveLanguage(state.locale).code
  }
}

function mapDispatchToProps(dispatch){
  return {
    departuresActions: bindActionCreators(departuresActions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Filters)
