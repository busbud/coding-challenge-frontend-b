import React, { Component, useState, useEffect, useRef } from "react";
import {
    FormattedMessage
} from 'react-intl';


import Departures from './Departures';

import { ReactComponent as CoachellaLogo } from '../assets/imgs/coachella-logo.svg';

const currentDateTime = new Date().toISOString().split('T');
const currentDate = currentDateTime[0].split('-');
let searchDate = `${currentDate[0]}-${currentDate[1]}-${parseInt(currentDate[2]) + 5}`;

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
    const url = `https://napi.busbud.com/x-departures/dr5reg/dp3wj6/${searchDate}`;
    const [results, updateResults] = useState([]);
    const [loading, updateLoading] = useState(true);

    useInterval(async () => {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/',
                'X-Busbud-Token': 'PARTNER_BaASYYHxTxuOINEOMWq5GA'
            }
        });
        const json = await response.json();
        updateResults(json);
        if (json.complete === true) { updateLoading(false); }
    }, loading ? 3000 : null);

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
                            <FormattedMessage id="coachella.city.origin" defaultMessage="NYC">
                                {
                                    placeholder =>
                                        <input
                                            id="origin-city"
                                            disabled
                                            type="text"
                                            name="origin-city"
                                            value={ placeholder }
                                        />
                                }
                            </FormattedMessage>
                        </div>
                        <div className="roadToOsheaga-coachella--search-form--section">
                            <label htmlFor="destination-city">
                                <FormattedMessage id="coachella.city.destination.title" defaultMessage="Destination:" />
                            </label>
                            <FormattedMessage id="coachella.city.destination" defaultMessage="Indio">
                                {
                                    placeholder =>
                                        <input
                                            disabled
                                            id="destination-city"
                                            type="text"
                                            name="destination-city"
                                            value={ placeholder }
                                        />
                                }
                            </FormattedMessage>
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
                                <Departures
                                    departures={
                                        results.departures.sort(
                                            (itemA, itemB) => (
                                                itemA.departure_time > itemB.departure_time ? 1 : -1
                                            )
                                        )
                                    }
                                    locations={results.locations}
                                />
                                <button
                                    className="roadToOsheaga-coachella--search-form--button"
                                    disabled={results.complete}
                                >
                                    <FormattedMessage
                                        id="commons.More"
                                        defaultMessage="Load More"
                                    />
                                </button>
                            </React.Fragment> :
                            null :
                        <p>Loading</p>
                }
            </div>
        </div>
    );
}