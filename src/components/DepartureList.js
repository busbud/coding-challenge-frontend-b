import React, { Component } from 'react';
import { DepartureListItem } from './DepartureListItem';
import { Onboarding } from './Onboarding';
import debounce from 'lodash.debounce';

import styles from './DepartureList.module.css';

export class DepartureList extends Component {
  onSearchClick = debounce(() => {
    const { getDeparturesAndLocations, searchParams } = this.props;
    getDeparturesAndLocations(searchParams);
  }, 100);

  render() {
    const { loadingDepartures, departures, locations, searchParams } = this.props;

    return (
      <main className={styles.container}>
        <Onboarding {...searchParams} onSearchClick={this.onSearchClick} />
        <ul className={styles.departures}>
          {loadingDepartures ? (
            <li>Loading departures ...</li>
          ) : (
            departures.map(
              ({
                busbud_departure_id,
                departure_time,
                arrival_time,
                origin_location_id,
                destination_location_id,
                prices
              }) => {
                const departureLocation = locations.find(elem => elem.id === origin_location_id);
                const arrivalLocation = locations.find(elem => elem.id === destination_location_id);
                return (
                  <DepartureListItem
                    key={busbud_departure_id}
                    departureTime={departure_time}
                    arrivalTime={arrival_time}
                    departureLocation={departureLocation}
                    arrivalLocation={arrivalLocation}
                    prices={prices}
                  />
                );
              }
            )
          )}
        </ul>
      </main>
    );
  }
}
