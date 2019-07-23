
import React from "react";
import './Results.css';
import { useDataProvider } from '../contexts/SearchContext';
import DepartureCard from './DepartureCard';
import { useTranslation } from 'react-i18next';

export const Results = () => {

    const { departures } = useDataProvider()
    const departureKeys = Object.keys(departures)
    const { t } = useTranslation();
    return <div>
        <div className="container">
            <div className="grid-wrapper">
                <div className="col-12">
                    <p>{t('Welcome to React')}</p>

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
