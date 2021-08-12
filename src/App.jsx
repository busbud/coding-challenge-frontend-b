import React, { useState, useEffect } from 'react'
import Header from './components/Header'
import SearchBox from './components/SearchBox'
import Loader from './components/Loader'
import { convertDateToISO, currencyFormat } from './util/util'

import './App.css'

function App() {
  const [originGeoHash, setOriginGeoHash] = useState('f2m673')
  const [destinationGeoHash, setDestinationGeoHash] = useState('f25dvk')
  const [departureDate, setDepartureDate] = useState()
  const [response, setResponse] = useState()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const todayToISO = new Date().toISOString() // the date given in the github repo is in the past, and rejected by the API
    const departuredateISO = todayToISO.substring(0, todayToISO.indexOf("T"))
    setDepartureDate(departuredateISO)
  }, [])


  const handleSearch = () => {
    setLoading(true)

    fetch(`https://napi.busbud.com/x-departures/${originGeoHash}/${destinationGeoHash}/${departureDate}/poll`, {
      headers: {
        Accept: "application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/",
        "X-Busbud-Token": import.meta.env.VITE_APP_BUSBUDTOKEN
      },
    })
      .then(response => response.json())
      .then(data => {
        setResponse(data)
        setLoading(false)
      })
      .catch(err => console.log(err))
  }

  return (
    <div className="bg-gradient-to-br from-blue-900 to-pink-600 dark:from-indigo-900 dark:to-green-900 min-h-screen overflow-auto">
      <div className="container max-w-5xl mx-auto px-4">
        <Header />
        <SearchBox departureDate={departureDate} handleSearch={handleSearch} />
        {loading && <Loader />}
        {response &&
          <>
            <div className="container mx-auto flex  mt-8 p-2 md:p-0">
              <div className="text-lg text-white">Results ({response?.departures?.length || '0'})</div>
            </div>
            <div className="container mx-auto flex justify-center items-center mt-8 p-2 md:p-0">
              <div className="border border-gray-300 p-6 grid grid-cols-6 gap-2 bg-white shadow-lg rounded-2xl w-full">
                <div>Departure Time</div>
                <div>Duration</div>
                <div>Available Seats</div>
                <div>Arrival Time</div>
                <div>Price Before Fees</div>
                <div>Trip Stops</div>

                {response && response?.departures?.map(departure => {
                  return (
                    <React.Fragment key={departure.id}>
                      <div>{convertDateToISO(departure.departure_time)}</div>
                      <div>{Math.floor(departure.duration / 60)}H:{departure.duration % 60}M</div>
                      <div>{departure.available_seats}</div>
                      <div>{convertDateToISO(departure.arrival_time)}</div>
                      <div>{currencyFormat(departure.prices.breakdown.base)}</div>
                      <div>{departure.trip_stops.length}</div>
                    </React.Fragment>
                  )
                })}
              </div>
            </div>
          </>
        }

      </div>
    </div>
  )
}

export default App
