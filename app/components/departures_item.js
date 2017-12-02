import React, { Component }             from 'react'
import { utcTimeToHhMm, numToCurrency } from '../utils'

export class DeparturesItem extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <div className="time">
          <span className="leave">{utcTimeToHhMm(this.props.departureTime)}</span>
          <span>{utcTimeToHhMm(this.props.arrivalTime)}</span>
        </div>
        <div className="location">
          <span>{this.props.departureName}</span>
          <span>{this.props.arrivalName}</span>
        </div>
        <div className="price">
          <span>{numToCurrency(this.props.price)}</span>
        </div>
      </div>
    )
  }
}

export default DeparturesItem