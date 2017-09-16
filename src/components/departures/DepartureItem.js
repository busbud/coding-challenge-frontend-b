import React from 'react'
import moment from 'moment'

class DepartureItem extends React.Component {
  constructor(props){
    super(props)

    this.state = props
  }

  render(){
    const { departure } = this.state
    const { departure_time, arrival_time } = departure
    const price = departure.prices.total / 100

    return(
      <div className='departure-item'>
        <p className='bold'>Départ: {moment(departure_time).format("HH:mm")}</p>
        <p>Arrivée: {moment(arrival_time).format("HH:mm")}</p>
        <p>Price: {price}</p>
      </div>
    )
  }
}

export default DepartureItem
