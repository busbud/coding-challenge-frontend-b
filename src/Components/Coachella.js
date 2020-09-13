import React, { Component, useState, useEffect, useRef } from "react";
import {
    FormattedMessage
} from 'react-intl';


import Departures from './Departures';

import { ReactComponent as CoachellaLogo } from '../assets/imgs/coachella-logo.svg';

const currentDateTime = new Date().toISOString().split('T');
const currentDate = currentDateTime[0].split('-');
let searchDate = `${currentDate[0]}-${currentDate[1]}-${parseInt(currentDate[2]) + 6}`;

// Hook from https://overreacted.io/making-setinterval-declarative-with-react-hooks/
function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

export default function Coachella() {
    const [results, updateResults] = useState([]);
    const [loading, updateLoading] = useState(true);
    const [refreshing, updateRefreshing] = useState(false);
    const [polling, updatePolling] = useState(false)
    const [newDeparturesId, updateNewDeparturesId] = useState([]);

    useInterval(async () => {
        const url = `https://napi.busbud.com/x-departures/dr5reg/9zvxvs/${searchDate}${polling || refreshing ? '/poll?index=10' : ''}`;
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/',
                'X-Busbud-Token': 'PARTNER_BaASYYHxTxuOINEOMWq5GA'
            }
        });
        const json = await response.json();

        if (results.departures && results.departures.length > 0) {
            let merge = {
                ...json,
                ...results
            }

            updateResults(merge);
        } else {
            updateResults(json);
        }

        if (json.complete === true) {
            let newIds = [];
            json.departures.map((departure) => (
                newDeparturesId.push(departure.id)
            ))

            updateNewDeparturesId(newDeparturesId);
            updatePolling(false);

            updateRefreshing(false);
            updateLoading(false);
        } else if (json.complete !== true && json.departures.length > 0){
            updatePolling(true);
        }
    }, loading || refreshing ? 3000 : null);

    return (
        <div className="roadToOsheaga-coachella--container">
            <header className="roadToOsheaga-coachella--header-container">
                <CoachellaLogo className="roadToOsheaga-coachella--header-logo" />
                <h2>
                    <FormattedMessage
                        id="coachella.title"
                        defaultMessage="Almost there!"
                    />
                </h2>
                <p className="roadToOsheaga-coachella--header-description">
                    <FormattedMessage
                        id="coachella.description"
                        defaultMessage="Few days away."
                    />
                </p>
                <div className="roadToOsheaga-coachella--search-container">
                    <form className="roadToOsheaga-coachella--search-form">
                        <div className="roadToOsheaga-coachella--search-form--section">
                            <label htmlFor="origin-city">
                                <FormattedMessage id="coachella.city.origin.title" defaultMessage="Departure:" />
                            </label>
                            <input
                                id="origin-city"
                                disabled
                                type="text"
                                name="origin-city"
                                value={ results.cities ? results.cities[0].name : '' }
                            />
                        </div>
                        <div className="roadToOsheaga-coachella--search-form--section">
                            <label htmlFor="destination-city">
                                <FormattedMessage id="coachella.city.destination.title" defaultMessage="Destination:" />
                            </label>
                            <input
                                id="destination-city"
                                disabled
                                type="text"
                                name="destination-city"
                                value={ results.cities ? results.cities[1].name : '' }
                            />
                        </div>
                        <div className="roadToOsheaga-coachella--search-form--section">
                            <label htmlFor="leaving-date">
                                <FormattedMessage id="coachella.leaving.date.title" defaultMessage="Date:" />
                            </label>
                            <input
                                disabled
                                id="leaving-date"
                                type="date"
                                name="leaving-date"
                                value={ searchDate }
                            />
                        </div>
                    </form>
                    <div className="roadToOsheaga-coachella--search-button--container">
                        <button
                            className="roadToOsheaga-coachella--search-form--button"
                            onClick={
                                () => {
                                    updateRefreshing(true);
                                }
                            }
                        >
                            <FormattedMessage
                                id="commons.Update"
                                defaultMessage="Update"
                            />
                        </button>
                    </div>
                </div>
            </header>
            <div className="roadToOsheaga-coachella--content-container">
                {
                    results && !loading ?
                        results.departures.length > 0 ?
                            <React.Fragment>
                                { refreshing ? 'Refreshing...' : null }
                                <Departures
                                    departures={
                                        results
                                            .departures
                                            .sort(
                                                (itemA, itemB) => {
                                                    if (itemA.departure_time === itemB.departure_time) {
                                                        if (itemA.prices.total >= itemB.prices.total) {
                                                            return -1;
                                                        } else {
                                                            return 1;
                                                        }
                                                    } else if (itemA.departure_time > itemB.departure_time) {
                                                        return 1;
                                                    } else {
                                                        return -1;
                                                    }
                                                }
                                            )
                                    }
                                    newDeparturesId={newDeparturesId || null}
                                    locations={results.locations}
                                    operators={results.operators}
                                />
                            </React.Fragment> :
                            null :
                        <p>Loading</p>
                }
            </div>
        </div>
    );
}