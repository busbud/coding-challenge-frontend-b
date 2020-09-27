import React from 'react'
import classes from './Departure.module.sass'

const Departure = ({ departure, operators, locations }) => {
  const operator = operators.find(o => o.id === departure.operator_id)
  const locationDeparture = locations.find(location => location.id === departure.trip_stops[0].location_id)
  const locationArrival = locations.find(location => location.id === departure.trip_stops[departure.trip_stops.length - 1].location_id)
  return (
    <div className={classes.Departure}>
      <div className={classes.Operator}>
        <a href={operator.url}><img src={operator.logo_url} alt='Operator logo' /></a>
      </div>
      <div>
        <div className={classes.Locations}>
          Departure:
          <div key={`departure-${departure.id}-location-departure`} className={classes.Location}>
            <div>{departure.departure_time}</div>
            <div className={classes.LocationName}>{locationDeparture.name}</div>
            <div className={classes.LocationAddress}>{locationDeparture.address.join(',')}</div>
          </div>
          <br />
          Arrival:
          <div key={`departure-${departure.id}-location-arrival`} className={classes.Location}>
            <div>{departure.arrival_time}</div>
            <div className={classes.LocationName}>{locationArrival.name}</div>
            <div className={classes.LocationAddress}>{locationArrival.address.join(',')}</div>
          </div>
        </div>
      </div>
      <br />
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
      <div>Price: {(departure.prices?.total / 100).toFixed(2)}$ {departure.prices?.currency}</div>
    </div>
  )
}

export default Departure
