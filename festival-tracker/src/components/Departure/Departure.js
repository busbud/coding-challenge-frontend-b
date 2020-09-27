import React from 'react'
import classes from './Departure.module.sass'

const Departure = ({ departure, operators }) => {
  const operator = operators.find(o => o.id === departure.operator_id)
  console.log(operator)
  return (
    <div className={classes.Departure}>
      <div className={classes.Operator}>
        <a href={operator.url}><img src={operator.logo_url} alt='Operator logo' /></a>
      </div>
      <div>
        Trip:
        <div className={classes.TripItems}>
          {departure.trip_stops.map((tripStop, i) => {
            return (
              <div className={classes.TripItem} key={`departure-${departure.id}-trip-${i}`}>
                <div className={classes.TripItemHour}>
                  {tripStop.departure_time
                    ? tripStop.departure_time?.substring(11, 19)
                    : tripStop.arrival_time?.substring(11, 19)}
                </div>
                <div className={classes.TripItemLocation}>{tripStop.name}</div>
              </div>
            )
          })}
        </div>
      </div>
      <div>Departure: {departure.departure_time}</div>
      <div>Arrival: {departure.arrival_time}</div>
      <div>Price: {(departure.prices?.total / 100).toFixed(2)}$ {departure.prices?.currency}</div>
    </div>
  )
}

export default Departure
