import React from 'react'
import _ from 'underscore'

class DeparturesHeader extends React.Component {
  constructor(props){
    super(props)

    this.departure = this.departure.bind(this)
    this.destination = this.destination.bind(this)
  }

  departure(){
    console.log(this.props)
    return _.first(this.props.cities)
  }

  destination(){
    return _.last(this.props.cities)
  }

  render(){
    const departure = this.departure()
    const destination = this.destination()

    console.log('hello render departures header')

    return(
      <div>
        <p>{departure.name}</p>
        <p>{destination.name}</p>
      </div>
    )
  }
}

export default DeparturesHeader
