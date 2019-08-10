import React, { useContext } from 'react';
import DepartureItem from './DepartureItem';
import Spinner from './layout/Spinner';
import BusbudContext from '../context/busbud/busbudContext';

const Departures = () => {
    const busbudContext = useContext(BusbudContext);
    const {laoding, departures, cities, locations} = busbudContext;

    if(laoding) {
        return <Spinner/>
    } else {
        return (
            <div>
                {departures.map(departure => (
                     <DepartureItem key={departure.id} departure={departure} cities={cities} locations={locations} />
                ))}
            </div>
        );
    }
}

export default Departures
