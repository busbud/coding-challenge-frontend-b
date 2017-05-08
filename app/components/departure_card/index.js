import React from 'react'
import styles from './style.css'

const Departure = ({departure, formatTime, formatMoney}) => {

  return (
    <div className={styles.card}>
      <div className={styles.itinerary}>

        <div className={styles.itineraryDetail}>
          <h4> { departure.origin.name } </h4>
          <p> {`Departing:  ${formatTime(departure.departureTime)}`} </p>
        </div>

        <div className={styles.itineraryDetail}>
          <h4> { departure.destination.name } </h4>
          <p> {`Arriving: ${formatTime(departure.arrivalTime)}`} </p>
        </div>
      </div>

      <div className={styles.carrier}>
        <div className={styles.logo}>
          <img src={departure.operator.logo_url} />
        </div>
        <h4 className={styles.name}>{departure.operator.name}</h4>
      </div>

      <div className={styles.callToAction}>
        <div className={styles.price}>
          <h3> {`Price: ${formatMoney(departure.price)}`} </h3>
        </div>
        <button className={styles.cta}> {`Select`} </button>
      </div>

    </div>
  )
}

export default Departure
