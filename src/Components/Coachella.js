import React, { Component } from "react";
import {
    FormattedMessage
} from 'react-intl';


import Departures from './Departures';

import { ReactComponent as CoachellaLogo } from '../assets/imgs/coachella-logo.svg';

const currentDateTime = new Date().toISOString().split('T');
const currentDate = currentDateTime[0].split('-');

export default class Coachella extends Component {
    constructor(props) {
        super(props);

        this.state = {
            searchDate: `${currentDate[0]}-${currentDate[1]}-${parseInt(currentDate[2]) + 5}`
        }

        this.getSearchResults = this.getSearchResults.bind(this);
    }

    componentDidMount() {
        this.getSearchResults();
    }

    getSearchResults() {
        const url = `https://napi.busbud.com/x-departures/dr5reg/9mvrg6/${this.state.searchDate}`;
        fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/',
                'X-Busbud-Token': 'PARTNER_BaASYYHxTxuOINEOMWq5GA'
            }
        })
        .then(response => {
            return response.json();
        })
        .then(results => {
            this.setState({
                results
            })
        });
    }

    render() {
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
                                    value={ this.state.searchDate }
                                />
                            </div>
                        </form>
                    </div>
                </header>
                <div className="roadToOsheaga-coachella--results-container">
                    {
                        this.state.results ?
                            this.state.results.departures.length > 0 ?
                                <Departures
                                    departures={
                                        this.state.results.departures.sort(
                                            (itemA, itemB) => (
                                                itemA.departure_time > itemB.departure_time ? 1 : -1
                                            )
                                        )
                                    }
                                    locations={this.state.results.locations}
                                /> :
                                null :
                            <p>Loading</p>
                    }
                </div>
            </div>
        );
    }
}