import React from 'react'
import PropTypes from 'prop-types'
import DepartureCard from './components/DepartureCard'

class DeparturesList extends React.Component {
  render () {
    return (
      <div>
        {this.props.departures.map(departure => {
          return <DepartureCard key={departure.id} departure={departure} />
        })}
      </div>
    )
  }
}

DeparturesList.propTypes = {
  departures: PropTypes.array
}

export default DeparturesList
