import React from 'react'
import _ from 'underscore'

class DeparturesList extends React.Component {
  constructor(props){
    super(props)

    this.state = props
  }

  componentWillReceiveProps(nextProps){
    console.log('nextProps')
    console.log(nextProps)

    if(! (_.isEqual(this.state, nextProps))){
      this.setState({ departures: nextProps.departures })
    }
  }

  render(){
    const { departures } = this.state
    console.log(departures)

    return(
      <div>
        {
          _.map(departures, function(value){
            return(
              <h1>{value.arrival_timezone}</h1>
            )
          })
        }
      </div>
    )
  }
}

export default DeparturesList
