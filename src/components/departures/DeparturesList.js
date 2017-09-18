import React from 'react'
import _ from 'underscore'

import DepartureItem from './DepartureItem'

class DeparturesList extends React.Component {
  constructor(props){
    super(props)

    this.state = props
    this.getLocation = this.getLocation.bind(this)
  }

  componentWillReceiveProps(nextProps){
    if(! (_.isEqual(this.state.departures, nextProps.departures))){
      this.setState({ departures: nextProps.departures })
    }

    if(! (_.isEqual(this.state.locations, nextProps.locations))){
      this.setState({ locations: nextProps.locations })
    }
  }

  getLocation(location_id){
    const location = _.find(this.props.locations, (location) => {
                       if(location.id == location_id){
                         return location
                       }
                     })

    return location

    // return _.first(this.state.locations)
  }

  render(){
    const self = this
    const { departures, locations } = this.state

    return(
      <div className='departures-list flux pdt-30'>
        {
          _.map(departures, function(value, key){
            return(
              <DepartureItem key={key}
                             departure={value}
                             departureLocation={self.getLocation(value.origin_location_id)}
                             arrivalLocation={self.getLocation(value.destination_location_id)} />
            )
          })
        }
      </div>
    )
  }
}

export default DeparturesList
