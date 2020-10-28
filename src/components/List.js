import React, { useEffect, useState } from 'react';
import Ticket from './Ticket'
import { useTranslation } from 'react-i18next';


export default function List({latestData, isLoading, error, enabled}){

    const {t} = useTranslation();

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

    const loadingInitialResults =!error && (isLoading || (latestData && !latestData.complete && departures.length === 0)); //loading but no restults yet
    const pollingMoreResults = !error && ( latestData && !latestData.complete && departures.length > 0) //loading but alrady showing results
    const noResults = latestData && latestData.complete && latestData.departures.length === 0 && departures.length === 0;

    return(
        <div className="list">
            {error ? <div>{t("error")}</div> : ''}
            {noResults && <div>{t("noResults")}</div>}
            {loadingInitialResults && <img className="loading" src="loader-blue.gif"/>}
            {pollingMoreResults && <div className="polling"><span>{t("polling")}</span><img src="loader-blue.gif"/></div>}
            {departures.length > 0 && departures.map((departure, index) => {
                let operator = operators.filter(operators => operators.id === departure.operator_id)[0]
                return <Ticket key={index} departure={departure} operator={operator} cities={cities}/>
            })}
        </div>
    )
}