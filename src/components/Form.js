import React, { Component } from 'react';
import ResultsTable from './ResultsTable.js';

class Form extends Component {
    constructor(props) {
        super(props);

        this.state = { 
            from: '',
            to: '',
            date: '2018-08-02',
            adults: 1,
            results: {},
            isComplete: false,
            isFetching: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSubmit(e) {
        e.preventDefault();
        e.persist();
        this.setState({ isFetching: true });
        return fetch('https://napi.busbud.com/x-departures/' + this.state.from + '/' + this.state.to + '/' + this.state.date + '?adult=' + this.state.adults, {
            method: 'GET',
            headers: new Headers({
                Accept: 'application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/',
                'X-Busbud-Token': 'PARTNER_JSWsVZQcS_KzxNRzGtIt1A'
            })
        })
        .then(response => response.json())
        .then(json => {
            if (!json.complete) {
                this.setState({
                    isFetching: true
                });
                return setTimeout(() => {
                    this.handleSubmit(e);
                }, 5000);
            } else {
                this.setState({
                    results: json,
                    isComplete: json.complete,
                    isFetching: false
                });
            }
        });
    }

    render() {
        const mtlGeo = 'f25dvk';
        const nycGeo = 'dr5reg';

        const {from, to, date, adults} = this.state;
        const isEnabled = from.length > 0 && to.length > 0 && date.length > 0 && adults > 0;

        return (
            <div className="search_form">
                <h2 className="search_form__header">Search for Bus Tickets</h2>
                <form className="form" onSubmit={ this.handleSubmit }>
                    <div className="form__field">
                        <label htmlFor="input--from">
                            From
                        </label>
                        <select id="input--from" name="from" value={ this.state.value } onChange={ this.handleChange }>
                            <option value="">Select an option</option>
                            <option value={ nycGeo }>New York City</option>
                        </select>
                    </div>
                    <div className="form__field">
                        <label htmlFor="input--to">
                            To
                        </label>
                        <select id="input--to" name="to" value={ this.state.value } onChange={ this.handleChange }>
                            <option value="">Select an option</option>
                            <option value={ mtlGeo }>Montreal</option>
                        </select>
                    </div>
                    <div className="form__field">
                        <label htmlFor="input--date">
                            Date
                        </label>
                        <input id="input--date" type="text" name="date" value={ this.state.date } onChange={ this.handleChange } />
                    </div>
                    <div className="form__field">
                        <label htmlFor="input--adult">
                            # of adults
                        </label>
                        <input id="input--adult" type="number" name="adults" min="1" value={ this.state.adults } onChange={ this.handleChange } />
                    </div>
                    <input type="submit" disabled={!isEnabled} value="Search" />
                </form>
                <ResultsTable
                    resultsList={ this.state.results }
                    cities={ this.state.results.cities }
                    departures={ this.state.results.departures }
                    locations={ this.state.results.locations }
                    operators={ this.state.results.operators }
                    fetching={ this.state.isFetching }
                />
            </div>
        );
    }
}

export default Form;