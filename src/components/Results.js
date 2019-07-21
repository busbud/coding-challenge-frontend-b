
import React from "react";
import './Results.css';
import { useDataProvider } from '../contexts/SearchContext';
import DepartureCard from './DepartureCard';
// import LocationCard from './LocationCard';

export const Results = () => {

    const { departures, locations } = useDataProvider()
    const departureKeys = Object.keys(departures)
    return <div>Results
  <div className="container">
            <div className="grid-wrapper">
                <div className="col-12">
                    <div className="Results__locations">
                        {
                            departureKeys.length ? departureKeys.map((index) =>
                                <DepartureCard key={index} item={departures[index]} />
                            ) : <div>Loading...</div>
                        }
                    </div>
                </div>
            </div>
        </div>
    </div>
}

export default Results
