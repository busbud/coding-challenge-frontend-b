import React, { useEffect, useState } from 'react';
import Ticket from './Ticket'

export default function List({latestData, isLoading, error, enabled}){
    const [departures, setDepartures] = useState([]);
    const [operators, setOperators] = useState([]);
    const [cities, setCities] = useState([]);

    useEffect(() => {
        if (latestData) {
            if (latestData.departures) setDepartures(departures.concat(latestData.departures))
            if (latestData.operators) setOperators(operators.concat(latestData.operators))
            if (latestData.cities) setCities(cities.concat(latestData.cities))
        }
    }, [latestData])

    useEffect(() => {
        if (enabled) { //if enabled was changed to true, clean departures and cities for new fetch
            setDepartures([])
            setCities([])
        }
    }, [enabled])

    const loadingInitialResults = isLoading || (latestData && !latestData.complete && departures.length === 0);
    const pollingMoreResults = !isLoading && latestData && !latestData.complete && departures.length > 0


    return(
        <div className="list">
            {error ? <div>Error!</div> : ''}
            {loadingInitialResults && <img className="loading" src="loader-blue.gif"/>}
            {pollingMoreResults && <div className="polling"><span>Getting you more</span><img src="loader-blue.gif"/></div>}
            {departures.length > 0 && departures.map(departure => {
                let operator = operators.filter(operators => operators.id === departure.operator_id)[0]
                return <Ticket departure={departure} operator={operator} cities={cities}/>
            })}
            {/*<img src="osheaga-banner.png"/>*/}
        </div>
    )
}