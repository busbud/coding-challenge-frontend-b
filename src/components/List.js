import React, { useEffect, useState } from 'react';
import Ticket from './Ticket'
import { useTranslation } from 'react-i18next';


export default function List({latestData, isLoading, error, enabled}){

    const {t} = useTranslation();

    const [departures, setDepartures] = useState([]);
    const [operators, setOperators] = useState([]);
    const [locations, setLocations] = useState([]);
    const [cities, setCities] = useState([]);

    useEffect(() => {
        if (latestData) {
            if (latestData.departures) setDepartures(departures.concat(latestData.departures))
            if (latestData.operators) setOperators(operators.concat(latestData.operators))
            if (latestData.locations) setLocations(locations.concat(latestData.locations))
            if (latestData.cities) setCities(locations.concat(latestData.cities))
        }
    }, [latestData])

    useEffect(() => {
        if (enabled) { //if enabled was changed to true, clean departures and cities for new fetch
            setDepartures([])
            setLocations([])
            setCities([])
        }
    }, [enabled])

    const loadingInitialResults =!error && (isLoading || (latestData && !latestData.complete && departures.length === 0)); //loading but no restults yet
    const pollingMoreResults = !error && ( latestData && !latestData.complete && departures.length > 0) //loading but alrady showing results
    const noResults = latestData && latestData.complete && latestData.departures.length === 0 && departures.length === 0;

    return(
        <div className="list">
            {error ? <div className="message">{t("error")}</div> : ''}
            {noResults && <div className="message">{t("noResults")}</div>}
            {loadingInitialResults && <img className="loading" src="loader-blue.gif"/>}
            {pollingMoreResults && <div className="polling"><span>{t("polling")}</span><img src="loader-blue.gif"/></div>}
            {departures.length > 0 && departures.map((departure, index) => {
                let operator = operators.filter(operators => operators.id === departure.operator_id)[0]
                let originLocation = locations.filter( location => location.id === departure.origin_location_id)[0].name
                let destinationLocation = locations.filter( location => location.id === departure.destination_location_id)[0].name
                return <Ticket 
                    key={index} 
                    departure={departure} 
                    operator={operator} 
                    originLocation={originLocation} 
                    destinationLocation={destinationLocation}
                    cities={cities}/>
            })}
        </div>
    )
}