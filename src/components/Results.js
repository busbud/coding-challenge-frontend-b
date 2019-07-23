
import React from "react";
import { useDataProvider } from '../contexts/SearchContext';
import { useTranslation } from 'react-i18next';

import DepartureCard from './DepartureCard';
import CardLoader from './CardLoader';
import './Results.css';

export const Results = () => {

    const { departures, loading } = useDataProvider()
    const departureKeys = Object.keys(departures)
    const { t } = useTranslation();
    return <div>
        <div className="container">
            <div className="grid-wrapper">
                <div className="col-12 col-sm-12">
                    <div className="Results__locations">
                        {
                            departureKeys.map((index) =>
                                <DepartureCard key={index} item={departures[index]} />
                            )
                        }
                        {
                            loading ? <div>{t('Loading')}...
                                <CardLoader />
                            </div> : t('Start Search')
                        }
                    </div>
                </div>
            </div>
        </div>
    </div>
}

export default Results
