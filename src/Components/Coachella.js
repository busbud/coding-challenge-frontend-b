import React, { useState, useEffect, useRef } from "react";
import { FormattedMessage } from 'react-intl';

import Departures from './Departures';
import SearchDestination from './SearchDestination';
import SearchParameters from './SearchParameters';

import { ReactComponent as Bus} from '../assets/svg/icons/bus.svg';

const currentDateTime = new Date().toISOString().split('T');
const currentDate = currentDateTime[0].split('-');
// +7 days because the festival will be in 11 days, it takes 2 to 3 days to get there by bus and we want to arrive at least the day before
let searchDate = `${currentDate[0]}-${currentDate[1]}-${parseInt(currentDate[2]) + 7}`;

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
        const url = `https://napi.busbud.com/x-departures/dr5reg/9mvrg6/${searchDate}${polling || refreshing ? '/poll?index=10' : ''}`;
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
            if (refreshing) {
                json.departures.map((departure) => (
                    newDeparturesId.push(departure.id)
                ))

                updateNewDeparturesId(newDeparturesId);
            }

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
                <div className="roadToOsheaga-coachella--header-container-left">
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
                </div>
                <div className="roadToOsheaga-coachella--header-container-right">
                    <form className="roadToOsheaga-coachella--search-destination">
                        <SearchDestination
                            name='origin-city'
                            value={
                                results.cities ?
                                    results.cities[0].short_name : '...'
                            }
                            messageId="coachella.outbound"
                        />
                        <SearchDestination
                            name='destination-city'
                            value={
                                results.cities ?
                                    results.cities[1].short_name : '...'
                            }
                            messageId="coachella.inbound"
                        />
                    </form>
                </div>
            </header>
            <div className="roadToOsheaga-coachella--content-container">
                <div className="roadToOsheaga-coachella--content-container-left">
                    <SearchParameters
                        searchDate={searchDate}
                        updateRefreshing={updateRefreshing}
                    />
                </div>
                <div className="roadToOsheaga-coachella--content-container-right">
                {
                    results && !loading ?
                        results.departures.length > 0 ?
                            <React.Fragment>
                                {
                                    refreshing ?
                                        <Bus className="loader loader-bus" /> :
                                        null
                                }
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
                        <Bus className="loader loader-bus" />
                    }
                </div>
            </div>
        </div>
    );
}